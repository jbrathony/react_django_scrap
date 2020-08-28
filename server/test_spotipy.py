import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup
SPOTIPY_CLIENT_ID='86b6def5e40e4627a4cacf8042691496'
SPOTIPY_CLIENT_SECRET='0a00032e6c2f43cbbf8a4071484eb8dd'
timeout=20
def idriver():
    options = webdriver.ChromeOptions()
    options.headless = True  # if headeless parameter is set to true - the chrome browser will not appear in foreground
    options.add_argument('start-maximized')  # Start the chrome maximised
    options.add_argument('disable-infobars')  # Disable infobars
    options.add_argument('--incognito')
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    return driver

def check_isrc(driver,isrc):
    url = "https://isrcsearch.ifpi.org/#!/search?isrcCode={}&tab=lookup&showReleases=0&start=0&number=10".format(isrc)
    driver.get(url)
    time.sleep(1)
    try:
      text_isrc=driver.find_element_by_xpath('//*[@id="results"]/table/tbody/tr/td[7]').text
      print(text_isrc.lower())
      if text_isrc.lower()==isrc.lower():
        return 'yes'
    except:  # in case of failure
        pass
    return 'no'
def getViews(driver,keyword):
    # url
    url = f"https://www.youtube.com/results?search_query=" + keyword
    # get the url
    driver.get(url)
    # wait for some time
    # try:
    WebDriverWait(driver, timeout).until(EC.visibility_of_element_located((By.XPATH,'//*[@id="video-title"]'))).click()
             # result=driver.find_element_by_xpath('//*[@id="count"]/yt-view-count-renderer/span[1]').text.strip('vues').encode('unicode-escape')
    result=int((WebDriverWait(driver, timeout).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="count"]/yt-view-count-renderer/span[1]'))).text.strip('vues').encode('unicode-escape')).decode("utf-8", "strict").replace('\\u202f','')) # except:  # in case of failure
        # result = None
    driver.quit()
    return result

driver=idriver()
print(getViews(driver,'Chicago Freestyle (feat. Giveon)'))