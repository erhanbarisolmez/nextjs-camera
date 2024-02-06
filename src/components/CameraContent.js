'use client'
import { Grid } from '@mui/joy';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MediaCover from './MediaCover';
import { CameraXY } from './home/camera-xy';

export default function CameraContent() {
  const [selectedCoordinates, setSelectedCoordinates] = useState({ x: null, y: null });

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on('connect', () => {
      console.log('connected to socket.')
    })

  }, [])

  const handleAreSelect = (coordinates) => {
    setSelectedCoordinates(coordinates);
    sendCoordinatesToServer(coordinates);
    sendCoordinatesToSocket(coordinates);
  }

  const sendCoordinatesToServer = (coordinates) => {
    const serverUrl = "http://192.168.4.222:5000/receive_rectangle_data";

    const rectangle_data = {
      "center_x": coordinates.x,
      "center_y": coordinates.y,
      "width": 500,
      "height": 500,
    }

    axios.post(serverUrl, rectangle_data)
    .then(response => {
      console.log("Successfully sent data to the server!", response);
    })
    .catch(error =>{
      console.log(`Error sending data to the server! ${error}`);
    });
    
  } 

  const sendCoordinatesToSocket = (coordinates) => {
    const socket = io("http://localhost:3000");
    socket.emit("sendCoordinates", coordinates);
    console.log("Coordinates sent to server:", coordinates);
  }
  return (
    <Tabs aria-label="Vertical tabs" orientation="vertical" sx={{ width: '100%' }}>
      <TabList>
        <Tab>Camera 1</Tab>
        <Tab>Camera 2</Tab>
        <Tab>Camera 3</Tab>
      </TabList>
      <TabPanel value={0}>
        <Grid item xs={5}>
          <MediaCover cameraURL="http://192.168.4.222:5000/video_feed" cameraNumber="Camera 1" onAreaSelect={handleAreSelect} />
          <CameraXY x={selectedCoordinates.x} y={selectedCoordinates.y} />
        </Grid>
      </TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
  );
}
