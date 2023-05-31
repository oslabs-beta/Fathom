import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image';
import icon from '/src/pages/assets/Fathom-text-gradient.png'

export const LoginHeader: React.FC = () => {
  const { data: sessionData } = useSession()

  return (

    // Topmost navbar, always displays. Includes Fathom logo and sign in button(s)
    <div className="navbar bg-gradient-to-br from-gray-800 to-base-100/60 fixed top-0 left-0 right-0  p-2">
      {/* gradient background, fixed position, span entire top of page, padding */}

      {/* logo */}
      <div className="ml-3 mt-3 flex-1 text-3xl font-bold">
        <Image
          src={icon}
          alt="fathom-icon"
          width={110}
          height={80}
        />
      </div>

      {/* image of the github user profile */}
      {sessionData?.user.image ? <img src={sessionData.user.image} className="w-10 rounded-full " /> : ""}

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