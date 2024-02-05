"use client";

import Head from "next/head";
import React from "react";
import LoadingPage from "~/components/LoadingPage";
import Map from "~/components/Map";

import { api } from "~/utils/api";

export default function Home() {
  const { data: cities } = api.cities.getAll.useQuery();

  if (!cities) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>City list</title>
        <meta name="description" content="City list homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={
          " flex h-screen w-screen content-center items-center bg-zinc-900 p-10"
        }
      >
        <div className="flex h-[500px] w-full flex-col gap-4 rounded-lg border border-gray-200 bg-zinc-800 p-6 shadow transition duration-300 ease-out">
          <h5 className="text-center text-2xl font-bold uppercase text-gray-900 dark:text-white">
            City list
          </h5>
          <p className="text-center font-normal text-gray-700 dark:text-gray-400">
            Pick a city to see additional information
          </p>
          <Map cities={cities} />
        </div>
      </main>
    </>
  );
}
