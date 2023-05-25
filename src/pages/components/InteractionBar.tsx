import {signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"

// TODO: define a type for InteractionBar props and import it instead of any
export const InteractionBar:any = ( { clusterIP, setClusterIP }:any ) => {
  const { data: sessionData } = useSession()
  const [inputIP, setInputIP] = useState('')
    // need to manage state: one of the props is likely to be a reference to state in the parent 
    // will give a reference to the IP address of the cluster to other components
  const handleClusterIPSubmit = (event: any) => {
    event.preventDefault()
    const newIP = (event.target as HTMLButtonElement).value
    if (newIP) setClusterIP(inputIP)
    console.log(inputIP)
  }

  const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newIP = (event.target as HTMLInputElement).value
    console.log('the new ip' , newIP)
    if (newIP) setInputIP(newIP)
    
  }
    return (
        <div className="navbar">
            <form className="ml-2 flex-1 text-xl">
              {/* needs typing for the onSubmit function */}
              <span className="mr-2">LoadBalancer IP:</span> 
              {/* research React.changeEvent https://stackoverflow.com/questions/61244635/type-void-is-not-assignable-to-type-event-changeeventhtmlinputelement*/}
              <input 
                type="text" 
                id="inputClusterID"
                placeholder={clusterIP} 
                onSubmit={ handleClusterChange} 
                
                className="input input-bordered w-full max-w-xs" 
              />
              <button className="btn" onClick={handleClusterIPSubmit}>Submit New IP</button>
              {/* onsubmit, add things in */}
            </form>
      </div>
            

    )
  }