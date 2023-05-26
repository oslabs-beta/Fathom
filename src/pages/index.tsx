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
  // refactored snapshotArr (array of objects) to snapshotObj (object) to keep track of our snapshots in our dropdown  
  // TODO load up snapshotObj from db according to user info  
  const [snapshotObj, setSnapshotObj] = useState({Current: 'now'})
  
  

  return (
    <>
      <Head>
        <title>Fathom for Kubernetes</title>
        <meta name="description" content="dashboard for all your kubernetes needs" />
      </Head>
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