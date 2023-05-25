import {signIn, signOut, useSession } from "next-auth/react"

export const LoginHeader:React.FC = () => {
  const { data: sessionData } = useSession()

  return (
    //this is the component
    <div className="navbar bg-info/10">
      <div className="ml-2 flex-1 text-2xl text-info/70 font-extrabold">
        Fathom 
      </div> 
      {/* image of the github user profile */}

      {sessionData?.user.image ? <img src={sessionData.user.image} className="w-10 rounded-full"/>: ""}

      {/* sign in/out button */}
      <button
        className="mr-4 ml-4 rounded-xl bg-white/10 px-8 py-2 no-underline transition hover:bg-info/30"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>

    </div>
  )
}