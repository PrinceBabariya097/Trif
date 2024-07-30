"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCall = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const meetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    call?.state.createdBy.id == localParticipant.userId;
  if (!meetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push('/')
      }}
      className="bg-red-500"
    >
        End Call For All
    </Button>
  );
};

export default EndCall;
