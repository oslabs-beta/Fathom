import { useEffect, useState } from "react";
import Image from 'next/image';
import icon from '/src/pages/assets/Fathom-text-blue.png'
// Component which displays when user is not logged in and/or the cluster IP has not been entered

export default function DashBlank() {
    return (
        <div className="mt-60 text-center mb-60 text-info/30">
            {/* margin, flex, font style, centers all text */}
            No Dashboard to Display

        </div>
    );
}
export function DashBlankSignedOut() {
    const [showComponent, setShowComponent] = useState(false);
  
    useEffect(() => {
      setShowComponent(true);
    }, []);
  
    return (
      <div
        className={"mt-40 text-center fade-in"}>
        <Image
src={icon}
alt="fathom-icon"
width={600}
/>
        {/* <div className="text-xl text-info/20">for Kubernetes</div> */}
        <style jsx>{`
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: .3;
            }
          }
          .fade-in {
            animation-name: fade-in;
            animation-duration: 2000ms; 
            animation-timing-function: ease-in;
            animation-fill-mode: forwards;
          }
        `}</style>
      </div>
    );
  }