import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// 
import { ClusterContext } from "./components/ClusterContext";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ClusterContext>
        <Component {...pageProps} />
      </ClusterContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
