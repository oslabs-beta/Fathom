import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"

// TODO: define a type for InteractionBar props and import it instead of any
export const InteractionBar: any = ({ clusterIP, setClusterIP }: any) => {
  const { data: sessionData } = useSession()
  const [inputIP, setInputIP] = useState('')

  // need to manage state: one of the props is likely to be a reference to state in the parent 
  // will give a reference to the IP address of the cluster to other components
  const handleClusterIPSubmit = (event: any) => {
    event.preventDefault()
    setClusterIP(inputIP)
    console.log('new ip cluster', clusterIP)
  }

  const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newIP = (event.target as HTMLInputElement).value
    if (newIP) setInputIP(newIP)
    console.log('the new ip', inputIP)

  }
  return (
    <div className="navbar flex flex-auto justify-center top-12 left-0 right-0">
      {/* navbar styling, flex layout, centers content */}

      {/* Form container */}
      <form className="text-l mt-8 mb-5">

        {/* needs typing for the onSubmit function */}
        {/* <span className="mr-2">LoadBalancer IP:</span> */}
        {/* research React.changeEvent https://stackoverflow.com/questions/61244635/type-void-is-not-assignable-to-type-event-changeeventhtmlinputelement*/}
        <input
          type="text"
          id="inputClusterID"
          placeholder="LoadBalancer IP"
          onChange={handleClusterChange}

          className="input input-bordered max-h-xs max-w-xs bg-info/10 rounded-xl"
        />

        {/* Button for submitting a new Cluster IP */}
        <button className="btn ml-2 bg-info/10" onClick={handleClusterIPSubmit}>Submit New IP</button>
        {/* onsubmit, render dashboard */}

      </form>
    </div>


  )
}