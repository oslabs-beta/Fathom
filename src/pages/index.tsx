import { type NextPage } from "next";
import Head from "next/head";
import React from 'react';
import Dashboard from './components/Dashboard';
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { LoginHeader } from "./components/LoginHeader";
import { InteractionBar } from "./components/InteractionBar";
import { useState } from "react";
import { DashBlankSignedOut } from 'src/pages/components/DashBlank'

const Home: NextPage = () => {
  const { data: sessionData } = useSession()
  const { data: clusterIPArray, refetch: refetchClusterIPArray } = api.clusterIP.getAll.useQuery<any, any>();
  console.log('the cluster IP', clusterIPArray)

  // refactored snapshotArr (array of objects) to snapshotObj (object) to keep track of our snapshots in our dropdown 
  // TODO load up snapshotObj from db according to user info 
  const [snapshotObj, setSnapshotObj] = useState({ Current: 'now' })
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
        {sessionData?.user.image ? <InteractionBar refetchClusterIPArray={refetchClusterIPArray} /> : <DashBlankSignedOut />}

        {
          (sessionData?.user.image && clusterIPArray !== null && clusterIPArray?.length> 0)
            ? (<div className="w-5/6"> <Dashboard initialClusterIP={clusterIPArray?clusterIPArray[0]['ipAddress']:''} refetchClusterIPArray={refetchClusterIPArray} clusterIPArray={clusterIPArray} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} dashNum={1} />
              <Dashboard initialClusterIP={clusterIPArray?clusterIPArray[0]['ipAddress']:''} refetchClusterIPArray={refetchClusterIPArray} clusterIPArray={clusterIPArray} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} dashNum={2} />
            </div>)

            : ""
        }
      </main>
    </>
  );
}
export default Home;