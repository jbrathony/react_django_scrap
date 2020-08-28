import React, { useState, useEffect } from "react";
import { Radio,Table } from 'semantic-ui-react';
import axios from "axios";
import CsvDownload from 'react-json-to-csv';
// import { Doughnut } from 'react-chartjs-2';



const ScrapedData = (props) => {

  const type = props.type;
  const keyword = props.keyword;
  const start=props.start;
  const chng=props.onChange;
  const [state, setState] = useState("");
  const [unregistered,setUnregistered]= useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await axios
          .get(`/api/search?type=${type}&keyword=${keyword}`)
          .then((res) => setState(res.data));

        setState(responseData.data);
        
      } catch (err) {}
    };
    if(start){
  console.log(keyword);
    fetchUsers();

  }
  }, [type, keyword,start]);


if (state.results) {
  chng(start);
  console.log(state.info_stat);
  return (
    <React.Fragment>
          <CsvDownload data={state.results}
          style={{ //pass other props, like styles
            boxShadow:"inset 0px 1px 0px 0px #5ab3f2",
            background:"linear-gradient(to bottom, #5ab3f2 5%, #5ab3f2 100%)",
            backgroundColor:"#5ab3f2",
            borderRadius:"6px",
            border:"1px solid #5ab3f2",
            display:"inline-block",
            cursor:"pointer","color":"#ffffff",
            fontSize:"15px",
            fontWeight:"bold",
            padding:"6px 24px",
            textDecoration:"none",
            textShadow:"0px 1px 0px #9b14b3"
            }} filename={type+"_"+keyword+".csv"} />
            <Table color='blue' key='blue' inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Spotify streams</Table.HeaderCell>
            <Table.HeaderCell>Spotify unregistered streams</Table.HeaderCell>
            <Table.HeaderCell>% unregistered </Table.HeaderCell>
            <Table.HeaderCell>YouTube streams</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{(state.info_stat.total_sp).toLocaleString('en-US')}</Table.Cell>
            <Table.Cell>{(state.info_stat.total_sp_no).toLocaleString('en-US')}</Table.Cell>
            <Table.Cell>{Number(((state.info_stat.total_sp_no/state.info_stat.total_sp)*100).toFixed(2))}%</Table.Cell>
            <Table.Cell>{(state.info_stat.total_views).toLocaleString('en-US')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Radio toggle  label={unregistered ? 'unregistered':'registered'} onClick={()=>setUnregistered(!unregistered)}/>
<Table celled inverted >
    <Table.Row></Table.Row>  
    <Table.Row></Table.Row>
    <Table.Row></Table.Row>
    <Table.Row></Table.Row> 
    <Table.Header>
        <Table.HeaderCell>Artist</Table.HeaderCell>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Song</Table.HeaderCell>
        <Table.HeaderCell>Album</Table.HeaderCell>
        <Table.HeaderCell>URI</Table.HeaderCell>
        <Table.HeaderCell>ISRC</Table.HeaderCell>
        <Table.HeaderCell>Popularity</Table.HeaderCell>
        <Table.HeaderCell>Spotify streams</Table.HeaderCell>
        <Table.HeaderCell>YouTube streams</Table.HeaderCell>
    </Table.Header>
    <Table.Body >
    {state.results.map((track) => (
      unregistered===(track.pfrs==='no') &&
      <Table.Row error={'no'===track.pfrs}>
        <Table.Cell>{track.artist}</Table.Cell>
        <Table.Cell>{track.id}</Table.Cell>
        <Table.Cell>{track.song}</Table.Cell>
        <Table.Cell>{track.album}</Table.Cell>
        <Table.Cell><a href={track.uri}>Spotify App</a></Table.Cell>
        <Table.Cell >{track.isrc}</Table.Cell>
        <Table.Cell>{track.popularity}</Table.Cell>
        <Table.Cell>{(track.playCountSpotify).toLocaleString('en-US')}</Table.Cell>
        <Table.Cell>{(track.yt_views).toLocaleString('en-US')}</Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>
  </Table>
  {/* <Doughnut data={state.results.popularity} /> */}
  </React.Fragment>
    );
  } else {
    return null;
  }








};
export default ScrapedData;
