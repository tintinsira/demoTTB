import React from 'react';  
import { useRouter } from 'next/router';
 
import LayoutTTB from '../../components/LayoutTTB'; 


function ThanksAdvice() {
  const router = useRouter();
  const { seq } = router.query; 

  return (
    <LayoutTTB> 
      <div className="flex justify-center">
        <span className="my-4 mx-2 font-bold font-kanit  text-[#002e66]">
         ขอบคุณที่ร่วมตอบแบบสอบถาม
        </span>
      </div> 
    </LayoutTTB>
  );
}

export default ThanksAdvice;