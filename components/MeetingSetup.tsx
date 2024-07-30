'use client'
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({setIsMeetingSetup}:{setIsMeetingSetup:(value:boolean) => void}) => {
  const [isMicCamToggelOn, setISMicCamToggelOn] = useState(false)

  const call = useCall()  
  
  useEffect(() => {
    if(isMicCamToggelOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable()
      call?.camera.enable()
    }

  },[isMicCamToggelOn, call?.camera, call?.microphone])
  return (
    <div className="flex-center h-screen w-full flex-col gap-3 text-white">
        <h1 className="text-center text-2xl font-bold">Setup</h1>
        <VideoPreview/>
        <div className="flex-center h-16 gap-3">
          <label htmlFor="videotoggel">
          <input type="checkbox" name="videotoggel" checked={isMicCamToggelOn} onChange={(e) => setISMicCamToggelOn(e.target.checked)} />
          Join with camara and mic off
          </label>
          <DeviceSettings/>
        </div>
        <Button className="bg-green-500 p-4 hover:bg-green-800" onClick={() => {setIsMeetingSetup(true); call?.join()}}>
          Join now
        </Button>
    </div>
  );
};

export default MeetingSetup;
