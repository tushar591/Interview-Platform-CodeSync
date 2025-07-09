import Vapi from '@vapi-ai/web';
import dotenv from 'dotenv';
import AIDashboard from './AIDashboard';
dotenv.config();
import React, { useEffect } from 'react'

function AI_Interview(jobrole: string) {
  
    useEffect(() => {
        StartCall();
    },[jobrole]);

    function StartCall(){
            
    }
  
    return (
    <div>
      
    </div>
  )
}

export default AI_Interview

