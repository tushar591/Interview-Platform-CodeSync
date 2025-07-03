"use client";

import { useRouter } from "next/navigation";
import InterviewScheduleUI from "./InterviewScheduleUI";
import useUserRole from "@/hooks/useUserRole";
import LoaderUI from "@/components/ui/LoaderUi";

function SchedulePage() {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) return <LoaderUI />;
  if (!isInterviewer) return router.push("/");

  return <InterviewScheduleUI />;
}
export default SchedulePage;