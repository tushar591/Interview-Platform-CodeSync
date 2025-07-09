import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

type QuestionListProps = {
  jobrole: string;
};

function QuestionList({jobrole} : QuestionListProps) {
  
  const [Loading, setLoading] = useState(true);

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
    </div>
  )
}

export default QuestionList
