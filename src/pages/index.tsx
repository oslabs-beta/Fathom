import { type NextPage } from "next";
import Head from "next/head";
import React from 'react';
import Dashboard from './components/Dashboard';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { LoginHeader } from "./components/LoginHeader";
import { InteractionBar } from "./components/InteractionBar";
import { useState } from "react";
import {DashBlank} from 'src/pages/components/DashBlank'
import SecondDashboard from "./components/SecondDashboard";

const Home: NextPage = () => {
  const { data: sessionData } = useSession()

  const [clusterIP, setClusterIP] = useState("")


  // tRPC EXAMPLE START
  // hook example on how to destructure an array of the snapshots,
  // and a refetching function
  const {data: snapshots, refetch:refetchSnaps} = api.snapshot.getAll.useQuery()
  
  // hook example of new Mutation - 
  // call using  createNewSnapshot.mutate({unixtime:'newval'})
  // hooks into the defined api in api/routers/snapshot.ts
  const createNewSnapshot = api.snapshot.createNew.useMutation({
    onSuccess:()=>{
      refetchSnaps() // add void?
    }
  })
  // handlesubmit helper that uses the createNewSnapshot mutation/hook
  const checkProcedures = async () => {  
    console.log('snaps initially',snapshots)
    
    // creates new snapshot with that timestamp
    // NOTE: userId is read automatically from the context(see snapshot.ts>createNew)
    createNewSnapshot.mutate({
      unixtime:'1000099288'
    })
  refetchSnaps()
  console.log('snaps later',snapshots)
}

  // tRPC EXAMPLE END

  // refactored snapshotArr (array of objects) to snapshotObj (object) to keep track of our snapshots in our dropdown  
  // TODO load up snapshotObj from db according to user info  
  const [snapshotObj, setSnapshotObj] = useState({Current: 'now'})
  
  

  return (
    <>
      <Head>
        <title>Fathom for Kubernetes</title>
        <meta name="description" content="dashboard for all your kubernetes needs" />
      </Head>
      {/* extra button to test tRPC hooks */}
      <button onClick={(e)=>{checkProcedures()}}>blah</button>

      {/* can be modified here for components */}
    
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black pt-12">

        {/* <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-accent p-4">
          Fathom
        </h1> */}
        
        <LoginHeader />
       {/* passed in state/setStates as props to components that update/rely on them */}
        {sessionData?.user.image ? <InteractionBar clusterIP={clusterIP} setClusterIP={setClusterIP} />: ""}  
        {
          (sessionData?.user.image && clusterIP) 
            ? ( <div> <Dashboard clusterIP={clusterIP} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} /> 
                      <SecondDashboard clusterIP={clusterIP} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj}/>      
                </div>) 
            : <DashBlank/>
        }
     
        
      
      </main>
    </>
  );
}

export default Home;