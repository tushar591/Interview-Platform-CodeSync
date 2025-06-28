"use client";

import StreamVideoProvider from "@/components/ui/providers/StreamClientProvider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
