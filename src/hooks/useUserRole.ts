import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export default function useUserRole(){
    const {user} = useUser();

    const UserData = useQuery(api.users.getUserByClerkId, {
        clerkId: user?.id || "",
      });
    
    const isLoading = UserData === undefined;
    
    return{
        isLoading,
        isCandidate : UserData?.role === "candidate",
        isInterviewer : UserData?.role === "interviewer",
    };
};