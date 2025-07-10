"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import QuestionList from "./QuestionList";

export default function Inputs() {
  const [jobRole, setJobRole] = useState("");
  const [submittedRole, setSubmittedRole] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedRole(jobRole.trim());
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-emerald-500"
      >
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder="Enter the job role (e.g. Frontend Engineer)…"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="flex-1 bg-transparent border-0 focus:ring-0"
        />
        <Button type="submit" disabled={!jobRole.trim()}>
          Go
        </Button>
      </form>

      {submittedRole ? (
        <QuestionList jobrole={submittedRole} />
      ) : (
        <p className="text-center text-gray-500">
          Please enter a job role above to start your mock interview.
        </p>
      )}
    </div>
  );
}
