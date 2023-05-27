import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"

// TODO: define a type for InteractionBar props and import it instead of any
export const InteractionBar: any = ({ clusterIP, setClusterIP }: any) => {
  const { data: sessionData } = useSession()
  const [inputIP, setInputIP] = useState('')
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputIP; // Update the input field value when inputIP changes
    }
  }, [inputIP]);

  // need to manage state: one of the props is likely to be a reference to state in the parent 
  // will give a reference to the IP address of the cluster to other components
  const handleClusterIPSubmit = (event: any) => {
    event.preventDefault()
    setClusterIP(inputIP);
    setInputIP('');
    console.log('new ip cluster', clusterIP)
  }

  const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newIP = (event.target as HTMLInputElement).value
    if (newIP) setInputIP(newIP)
    console.log('the new ip', inputIP)

  }
  return (
    <div className="navbar flex flex-1 justify-center items-start top-12 left-0 right-0 mb-3">
      {/* navbar styling, flex layout, centers content */}

      {/* Form container */}
      <form className="text-l mt-8 ">

        {/* needs typing for the onSubmit function */}
        {/* <span className="mr-2">LoadBalancer IP:</span> */}
        {/* research React.changeEvent https://stackoverflow.com/questions/61244635/type-void-is-not-assignable-to-type-event-changeeventhtmlinputelement*/}
        <input
          type="text"
          id="inputClusterID"
          placeholder="LoadBalancer IP"
          onChange={handleClusterChange}
          defaultValue={inputIP} // Set the default value of the input field
          ref={inputRef} // Assign the ref to the input field
          className="input input-bordered max-h-xs max-w-xs bg-info/5 rounded-xl"
        />

        {/* Button for submitting a new Cluster IP */}
        <button className="btn mr-4 ml-4 rounded-xl bg-white/5 no-underline transition text-info" onClick={handleClusterIPSubmit}>Submit New IP</button>
        {/* onsubmit, render dashboard */}

      </form>
    </div>
  )
}