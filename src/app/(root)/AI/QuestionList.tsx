import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import InteriewCall from "./InteriewCall";

type QuestionListProps = {
  jobrole: string;
};

function QuestionList({ jobrole }: QuestionListProps) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    if (jobrole) {
      GenerateQuestionList();
    }
  }, [jobrole]);

  async function GenerateQuestionList() {
    try {
      setLoading(true);
      const result = await axios.post("/api/aimodel", {
        jobTitle: jobrole,
        jobDescription: "Responsible for building scalable frontends using React.",
        duration: "30 minutes",
        type: "Technical",
      });

      let rawContent = result.data?.content || "";

      rawContent = rawContent.replace(/^```json\s*/, "").replace(/```$/, "").trim();

      const parsed = JSON.parse(rawContent);
      setQuestionList(parsed.interviewQuestions || []);
    } catch (error) {
      console.error("Failed to load questions", error);
      setQuestionList([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex items-center gap-2 text-gray-600 animate-pulse">
          <Loader2Icon className="animate-spin" />
          Loading interview questions...
        </div>
      ) : questionList.length > 0 ? (
        <InteriewCall questions={questionList} jobrole={jobrole}/>
      ) : (
        <p className="text-red-500">Not Enough Tokens Left. Reload the Page.</p>
      )}
    </div>
  );
}

export default QuestionList;
