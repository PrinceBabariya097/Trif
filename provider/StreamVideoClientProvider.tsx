'use client'
import tokenProvider from "@/actions/generateToken";
import Loader from "@/components/loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!user) return;
    if (!isLoaded) return;
    if(!API_KEY) throw Error("there is not any stream api key")


    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client)
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>
    {children}
  </StreamVideo>;
};

export default StreamVideoClientProvider;
