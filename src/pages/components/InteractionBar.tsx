import {signIn, signOut, useSession } from "next-auth/react"

// TODO: define a type for InteractionBar props and import it instead of any
export const InteractionBar:any = ( { clusterIP, setClusterIP }:any ) => {
  const { data: sessionData } = useSession()
  
    // need to manage state: one of the props is likely to be a reference to state in the parent 
    // will give a reference to the IP address of the cluster to other components


    return (
        <div className="navbar">
            <div className="ml-2 flex-1 text-2xl">
              {/* needs typing for the onSubmit function */}
              LoadBalancer IP: <input type="text" placeholder={clusterIP}/>
              {/* onsubmit, add things in */}
            </div>
      </div>
            

    )
  }