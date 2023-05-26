import { signIn, signOut, useSession } from "next-auth/react"
// import Image from 'next/image';

export const LoginHeader: React.FC = () => {
  const { data: sessionData } = useSession()

  return (

    // Topmost navbar, always displays. Includes Fathom logo and sign in button(s)
    <div className="navbar bg-gradient-to-b from-gray-800 to-base-100/60 fixed top-0 left-0 right-0  p-2">
      {/* gradient background, fixed position, span entire top of page, padding */}

      {/* Future location of logo */}
       {/* <Image
          src="/src/pages/assets/fathom2-white.png"
          alt="Fathom icon"
          width={60}
          height={60}
        /> */}

      <div className="ml-2 flex-1 text-3xl font-bold">
      {/* margin, flex layout with flex-grow, text size and bold font */}
        <span className="ml-2 bg-gradient-to-br from-info to-blue-gray-800 bg-clip-text text-transparent"> Fathom </span>
          {/* margin, gradient background, text clipping */}
      </div>

      {/* image of the github user profile */}
      {sessionData?.user.image ? <img src={sessionData.user.image} className="w-9 rounded-full " /> : ""}

      {/* sign in/out button */}
      <button
        className="btn mr-4 ml-4 rounded-xl bg-white/5  no-underline transition text-info"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in with GitHub"}
      </button>
    </div>
  )
}