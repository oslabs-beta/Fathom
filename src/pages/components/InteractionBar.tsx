import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { api } from "~/utils/api";

// TODO: define a type for InteractionBar props and import it instead of any
export const InteractionBar: any = ({ clusterIP, setClusterIP }: any) => {
  const { data: sessionData } = useSession()
  const [inputIP, setInputIP] = useState('')
  const [isIPValid, setIsIPValid] = useState(true);
  const inputRef = useRef(null);
  
  // TRPC
  const {data: clusterIPArray, refetch:refetchClusterIPArray} = api.clusterIP.getAll.useQuery();
  
  const createNewClusterIP = api.clusterIP.createNew.useMutation({
    onSuccess:()=>{
      // refetchSnaps() // add void?
      console.log('successfully saved clusterIP')
    }
  })

// Update the input field value when inputIP changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputIP; 
    }
  }, [inputIP]);

  const validateIP = (IP) => {
    if (IP && /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(IP)) {
      setIsIPValid(true);
      console.log("IP VALID")
      return true;
    }
    else {
      console.log("IP INVALID")
      return false;
    }
  };

  // need to manage state: one of the props is likely to be a reference to state in the parent 
  // will give a reference to the IP address of the cluster to other components
  const handleClusterIPSubmit = (event: any) => {
    event.preventDefault()
    if (validateIP(inputIP)) {
    setClusterIP(inputIP);
    setInputIP('');
    // console.log('new ip cluster', clusterIP)
    // console.log(typeof clusterIP)
    createNewClusterIP.mutate({clusterIP: inputIP})
    refetchClusterIPArray();
    console.log(clusterIPArray);
    }
    else {
      setInputIP('');
      setIsIPValid(false);
    }
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
        {/* research React.changeEvent https://stackoverflow.com/questions/61244635/type-void-is-not-assignable-to-type-event-changeeventhtmlinputelement*/}
        {clusterIP ? <p className="text-l mr-5">Current Cluster IP: {clusterIP} {}</p> : ''}

        
        <input
          type="text"
          id="inputClusterID"
          placeholder={isIPValid ? "LoadBalancer IP" : "* Invalid IP Address *"}
          onChange={handleClusterChange}
          defaultValue={inputIP} // Set the default value of the input field
          ref={inputRef} // Assign the ref to the input field
          className={`input input-bordered max-h-xs max-w-xs bg-info/5 rounded-xl ${isIPValid ? "" : "border-info"}`}

        />

        {/* Button for submitting a new Cluster IP */}
        <button className="btn mr-4 ml-4 rounded-xl bg-white/5 no-underline transition" onClick={handleClusterIPSubmit}>Submit New IP</button>
        {/* onsubmit, render dashboard */}

      </form>
    </div>
  )
}