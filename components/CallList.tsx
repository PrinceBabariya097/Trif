"use client";
import useGetCalls from "@/Hooks/useGetCalls";
import React, { useEffect, useState } from "react";
import MeetingCards from "./MeetingCards";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import Loader from "./loader";
import { useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: "upcoming" | "recording" | "ended" }) => {
  const { callRecordings, endedCalls, upcomingCalls, isLoading } = useGetCalls();
  const router = useRouter()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const {toast} = useToast()

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recording":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNocallMessage = () => {
    switch (type) {
      case "ended":
        return "No Privious Calls";
      case "recording":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };
  const calls = getCalls();
  const nocallsMessage = getNocallMessage();

  useEffect(() => {
   try {
     const fetchRecordings = async () => {
       const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))
 
       const recordings = callData.filter((call) => call.recordings.length > 0).flatMap(call => call.recordings)
 
       setRecordings(recordings)
     }
 
     if(type === 'recording') fetchRecordings()
   } catch (error) {
    toast({title: ' Try again Later '})
   }
  },[type, callRecordings])

  if (isLoading) return <Loader/>

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0
        ? calls.map((meeting: Call | CallRecording) => (
            <MeetingCards
              key={(meeting as Call).id}
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                "No Description"
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === "ended"}
              link={
                type === "recording"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              buttonIcon1={
                type === "recording" ? "/icons/play.svg" : undefined
              }
              buttonText={type === "recording" ? "Play" : "Start"}
              handleClick={
                type === "recording"
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          ))
        : nocallsMessage}
    </div>
  );
};

export default CallList;
