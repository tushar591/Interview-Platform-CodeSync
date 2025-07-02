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
   // console.log("useEffect start:", { isLoaded, user });
    if (!isLoaded || !user) {
     // console.log(" Waiting for Clerk to load or sign in");
      return;
    }
   // console.log("Clerk ready, initializing StreamVideoClient…");

    try {
      const c = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        user: {
          id: user.id,
          name:
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.id,
          image: user.imageUrl,
        },
        tokenProvider: streamTokenProvider,
      });
      //console.log("Created StreamVideoClient:", c);
      setClient(c);
    } catch (err) {
      console.error(" Error constructing StreamVideoClient:", err);
    }
  }, [user, isLoaded]);

  //console.log(" StreamVideoProvider render, client state is:", client);

  if (!isLoaded) {
    return <LoaderUI />;
  }

  if (!user) {
    return <>{children}</>;
  }

  if (!client) {
    return <LoaderUI />;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
