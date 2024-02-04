import Head from "next/head";
import React from "react";
import LoadingPage from "~/components/LoadingPage";

import { api } from "~/utils/api";

export default function Home() {
  const { data, isLoading } = api.cities.getAll.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>City list</title>
        <meta name="description" content="City list homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        City map
      </main>
    </>
  );
}
