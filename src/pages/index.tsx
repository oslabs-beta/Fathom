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
  const [clusterIP, setClusterIP] = useState("123.456.78")

  return (
    <>
      <Head>
        <title>Fathom for Kubernetes</title>
        <meta name="description" content="dashboard for all your kubernetes needs" />
      </Head>
      {/* can be modified here for components */}
    
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {/* <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-accent p-4">
          Fathom
        </h1> */}
    
        <LoginHeader />
        <InteractionBar clusterIP={clusterIP} setClusterIP={setClusterIP} />
        <Dashboard />

      </main>
    </>
  );
}

export default Home;