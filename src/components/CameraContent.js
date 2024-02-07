'use client'
import { Grid } from '@mui/joy';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import axios from 'axios';
import { useState } from 'react';
import MediaCover from './MediaCover';
import { CameraXY } from './home/camera-xy';

export default function CameraContent() {
  const [selectedCoordinates, setSelectedCoordinates] = useState({ x: null, y: null });
  const [selectedCoordinatesWidth, setSelectedCoordinatesWidth] = useState({ w:null, h:null});
  const [isAreaSelected, setIsAreaSelected] = useState(false);
  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   socket.on('connect', () => {
  //     console.log('connected to socket.')
  //   })

  // }, [])

  const handleClick = () => {
    
  }
  const handleAreSelect = (coordinates) => {
    setSelectedCoordinates(coordinates);
    sendCoordinatesToServer(coordinates);
    // sendCoordinatesToSocket(coordinates);
    setIsAreaSelected(true);

  }

  const handleAreaSelect2 = (coordinates) => {
   setSelectedCoordinatesWidth(coordinates);
   sendCoordinatesToServer(coordinates);
   setIsAreaSelected(true);

  }

  const sendCoordinatesToServer = (coordinates) => {
    const serverUrl = "http://192.168.4.222:5000/receive_rectangle_data";
    const rectangle_data = {
      "center_x": coordinates.x,
      "center_y": coordinates.y,
      "width": coordinates.w,
      "height": coordinates.h,
    }

    axios.post(serverUrl, rectangle_data)
      .then(response => {
        console.log("Successfully sent data to the server!", response);
      })
      .catch(error => {
        console.log(`Error sending data to the server! ${error}`);
      });

  }

  // const sendCoordinatesToSocket = (coordinates) => {
  //   const socket = io("http://localhost:3000");
  //   socket.emit("sendCoordinates", coordinates);
  //   console.log("Coordinates sent to server:", coordinates);

  // }
  return (
    <Tabs aria-label="Vertical tabs" orientation="vertical" sx={{ width: '100%' }}>
      <TabList>
        <Tab>Camera 1</Tab>
        <Tab>Camera 2</Tab>
        <Tab>Camera 3</Tab>
      </TabList>
      <TabPanel value={0}>
        <Grid item xs={5}>
          <MediaCover
            cameraURL="http://192.168.4.222:5000/video_feed"
            cameraNumber="Camera 1"
            onAreaSelect={handleAreSelect} 
            onAreaSelect2 = {handleAreaSelect2}
            isAreaSelected={isAreaSelected}
            selectedCoordinates={selectedCoordinates}
            selectedCoordinatesWidth={selectedCoordinatesWidth}
            />
       
          <CameraXY
            x={selectedCoordinates.x}
            y={selectedCoordinates.y}
            w= {selectedCoordinatesWidth.w}
            h={selectedCoordinatesWidth.h}
           
            />
       
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
