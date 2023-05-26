import { type NextPage } from "next";
import Head from "next/head";
import React from 'react';
import Dashboard from './components/Dashboard';
import InputBar from './components/InputBar'
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { LoginHeader } from "./components/LoginHeader";
import { InteractionBar } from "./components/InteractionBar";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession()
  // old connection/needs to be updated with sunjin  state changes
  const [clusterIP, setClusterIP] = useState("12.34.567.890")

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

  return (
    <>
      <Head>
        <title>Fathom for Kubernetes</title>
        <meta name="description" content="dashboard for all your kubernetes needs" />
      </Head>
      {/* extra button to test tRPC hooks */}
      <button onClick={(e)=>{checkProcedures()}}>blah</button>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-800  to-black">
        {/* <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-accent p-4">
          Fathom
        </h1> */}
        
        <LoginHeader />
        <InteractionBar clusterIP={clusterIP} setClusterIP={setClusterIP} />
        <Dashboard clusterIP={clusterIP}/>

      </main>
    </>
  );
}

export default Home;