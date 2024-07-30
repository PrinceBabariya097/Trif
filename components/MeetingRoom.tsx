"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import EndCall from "./EndCall";
import Loader from "./loader";

type layoutState = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const [layout, setLayout] = useState<layoutState>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get('personal')
  const router = useRouter();
  const {useCallCallingState} = useCallStateHooks()
  const callingState = useCallCallingState()

  if(callingState !== CallingState.JOINED) return <Loader/>

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex-center size-full ">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("hidden ml-2 h-[calc(100vh-86px)]", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push("/")} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase() as layoutState)}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-1"/>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white"/>
          </div>
        </button>
        {!isPersonalRoom && <EndCall/>}
      </div>
    </section>
  );
};

export default MeetingRoom;
