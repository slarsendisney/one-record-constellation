"use client";

import { useGuide, GuideSidebar } from "@/components/guide";

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
    <GuideSidebar>
      {Object.keys(data).length > 0 ? (
        <div className="flex flex-col p-16">
          <>
            {data.authEndpoint && (
              <>
                <b className="font-semibold">Auth token endpoint</b>
                <input value={data.authEndpoint} />
              </>
            )}
            {data.serverUrl && (
              <>
                <b className="font-semibold">ONE Record Server URL</b>
                <input value={data.serverUrl} />
              </>
            )}
            {data.clientId && (
              <>
                <b className="font-semibold">Client ID</b>
                <input value={data.clientId} />
              </>
            )}
            {data.accessToken && (
              <>
                <b className="font-semibold">Access Token</b>
                <input value={data.accessToken} />
              </>
            )}
          </>
        </div>
      ) : (
        <p>Nothing here yet</p>
      )}
    </GuideSidebar>
  );
}
