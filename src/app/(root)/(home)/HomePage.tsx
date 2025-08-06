"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Loader2Icon, Sun, Moon, Sunset } from "lucide-react";
import ActionCard from "@/components/ui/ActionCard";
import MeetingCard from "@/components/ui/MeetingCard";
import MeetingModal from "@/components/ui/MeetingModal";
import { QUICK_ACTIONS } from "@/constants";
import useUserRole from "@/hooks/useUserRole";
import { api } from "../../../../convex/_generated/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};


const TimeDisplay = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };

    updateDateTime(); 
    const timerId = setInterval(updateDateTime, 1000); 

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-center md:text-right">
      <p className="text-5xl font-semibold text-white">{time}</p>
      <p className="text-lg text-sky-100">{date}</p>
    </div>
  );
};


const getGreeting = () => {
    const hour = new Date().getHours(); 
    if (hour < 12) return { message: "Good Morning" };
    if (hour < 17) return { message: "Good Afternoon" }; 
    return { message: "Good Evening" };
};

export default function HomePage() {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  
  const { message } = getGreeting();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase().replace(" ", "-")}`);
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto max-w-7xl p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* REDESIGNED WELCOME SECTION */}
      <motion.div
         className="mb-12 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-950 to-slate-900 p-8 text-white shadow-2xl"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold">{message}</h1>
            <p className="mt-2 text-lg text-sky-100">
              {isInterviewer
                ? "Here are your quick actions to manage interviews."
                : "Ready for your next interview? Let's get started."}
            </p>
          </div>
          <TimeDisplay />
        </div>
      </motion.div>

      {isInterviewer ? (
        <>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
          >
            {QUICK_ACTIONS.map((action) => (
              <motion.div key={action.title} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <ActionCard
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              </motion.div>
            ))}
          </motion.div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join an Instant Meeting" : "Start an Instant Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold">Your Upcoming Interviews</h2>
            <p className="mt-1 text-muted-foreground">
              View and join your scheduled interviews below.
            </p>
          </motion.div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
              >
                {interviews.map((interview) => (
                  <motion.div key={interview._id} variants={itemVariants} whileHover={{ scale: 1.03 }}>
                    <MeetingCard interview={interview} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="rounded-lg border bg-card p-12 text-center"
                variants={itemVariants}
              >
                <p className="text-lg font-medium text-foreground">You have no scheduled interviews.</p>
                <p className="mt-1 text-muted-foreground">Check back later or schedule a new one!</p>
              </motion.div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <motion.p
        className="mt-16 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Made with ❤️ by Tushar
      </motion.p>
    </motion.div>
  );
}