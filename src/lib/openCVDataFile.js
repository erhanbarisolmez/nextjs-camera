import cv from "@techstark/opencv-js";

export async function loadDataFile(cvFilePath){
  const response = await fetch('rtsp://admin:Ar969zda89@192.168.1.162/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif');
  const buffer = await response.arrayBuffer();
  cv.FS_createDataFile("/", cvFilePath, data, true, false, false);
}