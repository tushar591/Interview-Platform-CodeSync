"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Vapi from "@vapi-ai/web";
import { Mic, MicOff, PhoneOff } from "lucide-react";

interface Question {
  question: string;
  type: string;
}

interface InterviewSessionProps {
  questions: Question[];
  jobrole: string;
  aiStream?: React.ReactNode;
  candidateStream?: React.ReactNode;
}

export default function InterviewSession({
  questions,
  jobrole,
  aiStream,
  candidateStream,
}: InterviewSessionProps) {
  const { user } = useUser();
  const userName = user?.firstName || "Candidate";
  const [muted, setMuted] = useState(false);

  const vapi = useMemo(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_TOKEN!), []);

  const questionList = useMemo(
    () => questions.map((q) => q.question).join(", "),
    [questions]
  );

  useEffect(() => {
    if (questions.length > 0 && jobrole) {
      startInterview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, jobrole]);

  const startInterview = async () => {
    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${userName}, ready for your ${jobrole} interview?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "playht", voiceId: "jennifer" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI conducting an interview. Ask one question at a time:
Questions: ${questionList}
After each response, give feedback and proceed.
Wrap up at the end.
            `.trim(),
          },
        ],
      },
    };

    try {
      await vapi.start(assistantOptions as unknown as string);
    } catch (err) {
      console.error("Failed to start Vapi interview:", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Video Panels */}
      <div className="flex-1 flex gap-4 p-4">
        {/* AI Recruiter */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
          <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-600 text-white text-sm rounded">
            AI Recruiter
          </div>
          {aiStream || (
            <div className="flex items-center justify-center h-full text-white opacity-50">
              AI video feed
            </div>
          )}
        </div>

        {/* Candidate */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-sm rounded">
            You
          </div>
          {candidateStream || (
            <div className="flex items-center justify-center h-full text-white opacity-50">
              Candidate video
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t flex items-center justify-center space-x-6 bg-gray-50">
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
        >
          {muted ? (
            <MicOff className="w-5 h-5 text-red-500" />
          ) : (
            <Mic className="w-5 h-5 text-green-500" />
          )}
          <span className="text-sm">{muted ? "Unmute" : "Mute"}</span>
        </button>

        <button
          onClick={() => {
            vapi.stop();
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
        >
          <PhoneOff className="w-5 h-5" />
          <span className="text-sm">End Call</span>
        </button>
      </div>
    </div>
  );
}
