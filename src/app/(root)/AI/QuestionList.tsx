import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'

type QuestionListProps = {
  jobrole: string;
};

function QuestionList({jobrole} : QuestionListProps) {
  
  const [Loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]); 
  useEffect(() => {
    if(jobrole){
      GenerateQuestionList();
    }
  },[jobrole])

  async function GenerateQuestionList(){
    try{
      setLoading(true);
      const result = await axios.post('/api/aimodel', { jobrole });
      console.log(result.data);
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace('"```json','').replace('```"', '');
      setQuestionList(JSON.parse(FINAL_CONTENT?.interviewQuestions));
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }
  
  return (
    <div>
      {
        Loading && <Loader2Icon></Loader2Icon>
      }

      {questionList.length > 0 && questionList.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
        </div>
      ))}
    </div>
  )
}

export default QuestionList
