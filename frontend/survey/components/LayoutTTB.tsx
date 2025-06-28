// components/Layout.js
import React from 'react';
import Image from 'next/image'; 

interface LayoutProps {
  children: React.ReactNode;  
}

const LayoutTTB = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="bg-[#ebf0f8] min-h-dvh flex">
        <div className="bg-white shadow-2xl my-2 mx-4 border-2 border-blue-50 rounded-md w-full flex">
          <div className="mx-4 my-4 flex flex-col flex-grow">
            <div className="mb-8">
              <Image
                className="dark:invert"
                src="/ttb_logo.png"
                alt="ttblogo"
                width={75}
                height={75}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutTTB;
