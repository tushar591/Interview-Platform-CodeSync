"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AIMockInterviewButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/AI");
      }}
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
    >
      AI Mock Interview
    </Button>
  );
}
