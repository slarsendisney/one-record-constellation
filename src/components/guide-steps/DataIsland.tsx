"use client";

import { useGuide } from "@/components/guide";
import { Input } from "../Input";

export function DataIsland() {
  const {
    state: { data },
  } = useGuide<{
    authEndpoint: string;
    serverUrl: string;
    clientId: string;
    accessToken: string;
  }>();

  return (
    <div
      className={`sticky top-[2.5rem] w-[37.5%] h-full ml-auto bg-one-record-blue-100 rounded-lg shadow-md transition-all duration-200 ${
        Object.keys(data).length > 0
          ? "translate-x-0 opacity-100"
          : "translate-x-96 opacity-0"
      }`}
    >
      <div className="flex flex-col p-6 min-h-[12rem] text-sm">
        <>
          {data.authEndpoint && (
            <div className="flex flex-col mb-2">
              <b className="font-semibold">Auth token endpoint</b>
              <Input value={data.authEndpoint} />
            </div>
          )}
          {data.serverUrl && (
            <div className="flex flex-col mb-2">
              <b className="font-semibold">ONE Record Server URL</b>
              <Input value={data.serverUrl} />
            </div>
          )}
          {data.clientId && (
            <div className="flex flex-col mb-2">
              <b className="font-semibold">Client ID</b>
              <Input value={data.clientId} />
            </div>
          )}
          {data.accessToken && (
            <div className="flex flex-col mb-2">
              <b className="font-semibold">Access Token</b>
              <Input value={data.accessToken} />
            </div>
          )}
        </>
      </div>
    </div>
  );
}
