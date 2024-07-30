"use client";
import Loader from "@/components/loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { GetCallById } from "@/Hooks/GetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const MeetingPage = ({ params:{id} }: { params: { id: string } }) => {
  const [isMeetingSetup, setIsMeetingSetup] = useState<boolean>(false);
  const {call, callLoading} = GetCallById(id)
  const {isLoaded} = useUser()

  if (!isLoaded || callLoading) {
    return <Loader/>
  }

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );
  
  return (
    <section className="h-full w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {(!isMeetingSetup && !callLoading) ? (
            <MeetingSetup setIsMeetingSetup={setIsMeetingSetup}/>
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </section>
  );
};

export default MeetingPage;
