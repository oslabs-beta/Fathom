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
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>My Clusters</a></li>
            <li><a>My Snapshots</a></li>
          </ul>
        </div>

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