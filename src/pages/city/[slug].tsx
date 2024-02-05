import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import type { Landmark } from "@prisma/client";

const DISPLAYED_PROPS = [
  "continent",
  "founded",
  "population",
  "landmarks",
] as const;

const CityPage = () => {
  const router = useRouter();
  const id = Number(router.query.slug);
  const { data: city } = api.cities.getById.useQuery(
    { id },
    { enabled: !isNaN(id) },
  );

  const getLandmarks = (landmarks: Landmark[]) => {
    const names = landmarks.map((landmark) => landmark.name);
    return names.join(", ");
  };

  if (!city) return null;

  return (
    <div className="h-screen w-screen bg-zinc-900 p-10">
      <h3 className="text-center text-4xl uppercase text-white">{city.name}</h3>
      <div className="-mb-3 mt-4">
        <div className="not-prose relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25">
          <div className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          <div className="relative overflow-auto rounded-xl p-8">
            <div className="flex flex-col gap-8">
              {DISPLAYED_PROPS.map((prop) => (
                <div key={prop}>
                  <span className="mb-3 font-mono text-sm font-medium text-slate-500 dark:text-slate-400">
                    {prop}
                  </span>
                  <p className="font-mono text-lg font-medium text-slate-900 dark:text-slate-200">
                    {prop === "landmarks"
                      ? getLandmarks(city[prop])
                      : city[prop]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
