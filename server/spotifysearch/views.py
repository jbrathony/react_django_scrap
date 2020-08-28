from django.shortcuts import render
from django.http import JsonResponse
from django.http import StreamingHttpResponse
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import requests
import json
from spotifysearch.youtubeScrap import *

def get_playcount(album_id,track_uri):
    url = "https://api.t4ils.dev/albumPlayCount?albumid=" + album_id
    res = requests.get(url)
    data_play_count = json.loads(res.text)
    for disc in data_play_count['data']['discs']:
      for tr in disc['tracks']:
        if tr['uri']==track_uri:
          return tr['playcount']
    return None


def get_spotipy_data(driver,myquery,limit):
  SPOTIPY_CLIENT_ID='86b6def5e40e4627a4cacf8042691496'
  SPOTIPY_CLIENT_SECRET='0a00032e6c2f43cbbf8a4071484eb8dd'

  sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET))
  RES=[]
  results = sp.search(q=myquery,type='track', limit=limit)
  total_views=0
  total_sp=0
  total_sp_no=0
  for idx, track in enumerate(results['tracks']['items']):
    print(idx)
    if track['album']['album_type']!='single':
      album=track['album']['name']
    else:
      album=''
    track_name=track['name']
    playCountSpotify=int(get_playcount(track['album']['id'],track['uri']))
    yt_views=getViews(driver,track_name)
    isrc=track['external_ids']['isrc']
    pfrs=check_isrc(driver,isrc)
    print(yt_views)
    total_views=total_views+yt_views
    total_sp=total_sp+playCountSpotify
    if pfrs!='yes':
      total_sp_no=total_sp_no+playCountSpotify

    RES.append({'index':idx,
        'song':track_name,
        'id':track['id'],
        'artist':track['artists'][0]['name'],
        'album':album,
        'uri':track['uri'],
        'isrc':isrc,
        'popularity':track['popularity'],
        'playCountSpotify':playCountSpotify,
        'yt_views':yt_views,
        'pfrs':pfrs
        })
  info_stat={"total_views":total_views,
  "total_sp":total_sp,
  "total_sp_no":total_sp_no,"size":len(RES)}
  return RES,info_stat

def search(request):
    driver=yt_driver()
    print(request.GET['type'])
    if request.GET['keyword']!="":
      if request.GET['type']!="song":
        mydata,info_stat=get_spotipy_data(driver,request.GET['type']+':'+request.GET['keyword'],8)
      else:
        mydata,info_stat=get_spotipy_data(driver,request.GET['keyword'],8)
    print(mydata)
    print(info_stat)
    driver.quit()
    print("done!")
    return JsonResponse({
      'results':mydata,
      'info_stat':info_stat
      })
