import {signIn, signOut, useSession } from "next-auth/react"

// TODO: define a type for InteractionBar props and import it instead of any
export const InteractionBar:any = ( { clusterIP, setClusterIP }:any ) => {
  const { data: sessionData } = useSession()
  
    // need to manage state: one of the props is likely to be a reference to state in the parent 
    // will give a reference to the IP address of the cluster to other components


    return (
        <div className="navbar flex flex-auto justify-center">
            <div className="ml-2 text-xl mt-5 mb-5">
              {/* needs typing for the onSubmit function */}
              LoadBalancer IP: <input type="text" placeholder={clusterIP} className="ml-3 bg-info/10 rounded-xl" onSubmit={()=>{}}/>
              {/* onsubmit, add things in */}
            </div>
      </div>
            

    )
  }