
"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUi";
import { streamTokenProvider } from "@/actions/stream.action";

interface Props {
  children: ReactNode;
}

export default function StreamVideoProvider({ children }: Props) {
  const [client, setClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
   
    console.log("🤖 Stream API Key:", process.env.NEXT_PUBLIC_STREAM_API_KEY);
    const c = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.id,
        image: user.imageUrl,
      },
      tokenProvider: streamTokenProvider,
    });

    setClient(c);
  }, [user, isLoaded]);

  console.log("StreamVideoProvider initialized client:", client);

  if (!client) {
    return <LoaderUI />;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
