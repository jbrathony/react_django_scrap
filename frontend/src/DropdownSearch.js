import React, { useState } from 'react';
import {Dimmer, Loader, Button, Radio ,Divider, Form, Segment } from 'semantic-ui-react'
import ScrapedData from "./ScrapedData";

// const options = [
//     { key: 'artist', text: 'Artist', value: 'artist' },
//     { key: 'song', text: 'Song', value: 'song' },
//     { key: 'isrc', text: 'ISRC', value: 'isrc' },
//   ]


const DropdownSearch = () => {

const [value,setValue]=useState('artist');
const [keyword,setKeyword]=useState('');
const handleChange = (event, {value}) => setValue(value);
const [load,setLoad]=useState(false);
const [start,setStart]=useState(false);
const handleSubmit=()=>{
  console.log("this is the value : "+keyword);
  if(keyword !== ""){
  setStart(true);
  setLoad(true);}
}
const handleStop =(val)=>{
  console.log('this is valStop :'+val);
   if(val===start){
     setLoad(false);
     setStart(false);
    }else{
      setLoad(true);
    }
   };

  return(
<Segment basic textAlign='center'>
<Form>
    <Form.Field>
      <label>Search</label>
      <input onChange={(e)=>{setKeyword(e.target.value)}} placeholder='Search...' />
    </Form.Field>
    <Form.Field>
          <Radio
            label='Artist'
            name='radioGroup'
            value='artist'
            checked={value === 'artist'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Song'
            name='radioGroup'
            value='song'
            checked={value === 'song'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='ISRC'
            name='radioGroup'
            value='isrc'
            checked={value === 'isrc'}
            onChange={handleChange}
          />
        </Form.Field>
    <Button primary type='submit' onClick={handleSubmit}>Search</Button>
    <Divider horizontal>Results</Divider>
    <Dimmer active={load} inverted>
        <Loader inverted>Scraping...</Loader>
      </Dimmer>
  </Form>
  <ScrapedData type={value} keyword={keyword} start={start} onChange={handleStop} />
  </Segment>
  );
}
  export default DropdownSearch;
  