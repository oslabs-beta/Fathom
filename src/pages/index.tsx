import { type NextPage } from "next";
import Head from "next/head";
import React from 'react';
import Dashboard from './components/Dashboard';
import InputBar from './components/InputBar'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Fathom for Kubernetes</title>
        <meta name="description" content="dashboard for all your kubernetes needs" />
      </Head>
      {/* can be modified here for components */}
      <div>
    </div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-accent p-4">
          Fathom
        </h1>
        <InputBar/>
        <Dashboard/>
      </main>
    </>
  );
};

export default Home;

