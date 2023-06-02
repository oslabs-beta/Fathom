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
  const { data: clusterIPArray, refetch: refetchClusterIPArray } = api.clusterIP.getAll.useQuery();
  console.log('the cluster IP', clusterIPArray)

  // current clusterIP !?
  // tRPC EXAMPLE START
  // hook example on how to destructure an array of the snapshots,
  // and a refetching function
  const { data: snapshots, refetch: refetchSnaps } = api.snapshot.getAll.useQuery()

  // hook example of new Mutation -
  // call using  createNewSnapshot.mutate({unixtime:'newval'})
  // hooks into the defined api in api/routers/snapshot.ts
  const createNewSnapshot = api.snapshot.createNew.useMutation({
    onSuccess: () => {
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
      unixtime: String(newTimestamp)
    })
    refetchSnaps() // refetch and display snapshots
    console.log('snaps later', snapshots)
  }
  // tRPC EXAMPLE END
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
          (sessionData?.user.image && clusterIPArray !== null && clusterIPArray?.length > 0)
            ? (<div className="w-5/6"> <Dashboard initialClusterIP={clusterIPArray[0]['ipAddress']} refetchClusterIPArray={refetchClusterIPArray} clusterIPArray={clusterIPArray} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} dashNum={1} />
              <Dashboard initialClusterIP={clusterIPArray[0]['ipAddress']} refetchClusterIPArray={refetchClusterIPArray} clusterIPArray={clusterIPArray} snapshotObj={snapshotObj} setSnapshotObj={setSnapshotObj} dashNum={2} />
            </div>)

            : ""
        }
      </main>
      <footer className="footer items-center p-4 text-info/70 bg-gradient-to-br from-gray-800/60 to-base-100/60 opacity-60">
        <div className="items-center grid-flow-col ml-2 mr-2">
          <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clip-rule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>

        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
          </a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
        </div>
      </footer>
    </>
  );
}
export default Home;