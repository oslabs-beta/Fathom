import {signIn, signOut, useSession } from "next-auth/react"

export const LoginHeader = () => {
  const { data: sessionData } = useSession()

  return (
    //this is the component
    <div className="navbar">
      <div className="ml-2 flex-1 text-2xl">
        Fathom
      </div>

      {/* image of the github user profile */}

      {sessionData?.user.image ? <img src={sessionData.user.image} className="w-10 rounded-full"/>: ""}

      {/* sign in/out button */}
      <button
        className="mr-2 ml-2 rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>

    </div>
  )
}