import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import QuestionList from './QuestionList';

function Inputs() {
      const [jobrole, setJobrole] = useState("");

  return (
    <div>
      <h1>Job Role</h1>
      <input
        type="text"
        value={jobrole}
        onChange={(e) => setJobrole(e.target.value)}
      />
      <QuestionList jobrole={jobrole} />
    </div>
  );
}

export default Inputs
