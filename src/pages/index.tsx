import { type NextPage } from "next";
import Head from "next/head";
import React from 'react';
import Dashboard from './components/Dashboard';
// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { LoginHeader } from "./components/LoginHeader";
import { InteractionBar } from "./components/InteractionBar";
import { useState } from "react";
import {DashBlankSignedOut} from 'src/pages/components/DashBlank'

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
      // refetchSnaps() // add void?
      console.log('successfully created new snapshot')
    }
  });

  // handlesubmit helper that uses the createNewSnapshot mutation/hook
  const checkSnapshot = () => {  
    // creates new snapshot with that timestamp
    // NOTE: userId is read automatically from the context(see snapshot.ts>createNew)
    const newTimestamp = Date.now()
    createNewSnapshot.mutate({
      unixtime:String(newTimestamp)
    })


  refetchSnaps() // refetch and display snapshots
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

      {/* can be modified here for components */}
    
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black pt-12">
      {/* this button tests the snapshot procedures: remove when snapshot CRUD is implemented */}
      {/* <button onClick={(e)=>{checkSnapshot()}}>blah</button> */}

        
        <LoginHeader />
   
       {/* passed in state/setStates as props to components that update/rely on them */}
        {sessionData?.user.image ? <InteractionBar clusterIP={clusterIP} setClusterIP={setClusterIP}/> : <DashBlankSignedOut/>}  
        
        {
          // currClusterId placeholder so that relation can be made between cluster, snapshot, user
          (sessionData?.user.image && clusterIP) 
            ? ( <div> <Dashboard clusterIP={clusterIP} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} dashNum = {1} currClusterId = {'clidd9uwq0007jlierc4v773v'}/> 
                      <Dashboard clusterIP={clusterIP} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} dashNum = {2} currClusterId = {'clidd9uwq0007jlierc4v773v'}/>      
                </div>) 
            :      ""
        }
      </main>
    </>
  );
}

export default Home;