import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image';

import icon from '/src/pages/assets/Fathom-text-blue.png'

export const LoginHeader: React.FC = () => {
  const { data: sessionData } = useSession()

  return (

    // Topmost navbar, always displays. Includes Fathom logo and sign in button(s)
    <div className="navbar bg-gradient-to-br from-gray-800 to-base-100/60 fixed top-0 left-0 right-0  p-1 ">
      {/* gradient background, fixed position, span entire top of page, padding */}
      <div className="navbar-start ">
        
      {/* logo */}
      <div className="ml-3 mt-3 flex-1 ">
        <Image
          src={icon}
          alt="fathom-icon"
          width={110}
        /> 
      </div>
      </div>
      <div className="navbar-end">     {/* image of the github user profile */}
        {sessionData?.user.image ? <img src={sessionData.user.image} className="w-10 rounded-full " /> : ""}

        {/* sign in/out button */}
        <button
          className="btn mr-4 ml-4 rounded-xl bg-white/5  no-underline transition text-info/80"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div></div>
  )
}