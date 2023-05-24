import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { LoginHeader } from "./components/LoginHeader";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>k8s</title>
        <meta name="description" content="dashboard for all your kubernetes needs" />
      </Head>

      <LoginHeader/>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold">hello world</h1>
      </main>
    </>
  );
};

export default Home;