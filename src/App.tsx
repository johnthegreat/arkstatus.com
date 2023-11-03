import "./App.css";
import ServersList from "./components/ServersList.tsx";
import Disclaimers from "./components/Disclaimers.tsx";
import { useEffect, useState } from "react";
import ReportStatusModal from "./components/modals/ReportStatusModal.tsx";

import ApiService from "./utils/ApiService.ts";
import ServerStatusModel from "./models/ServerStatusModel.ts";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const apiService = new ApiService(API_BASE_URL);

function App() {
  const [serverIdPendingUpdate, setServerIdPendingUpdate] =
    useState<string>("");
  const [servers, setServers] = useState<ServerStatusModel[]>([]);

  const findServerById = function (serverId: string) {
    const _filteredServers = servers.filter(function (server) {
      return server.server_name === serverId;
    });
    if (_filteredServers.length === 1) {
      return _filteredServers[0];
    }
  };

  function reloadServerList() {
    apiService.GetServers().then(function (_servers) {
      setServers(_servers);
    });
  }

  useEffect(function () {
    reloadServerList();
  }, []);

  return (
    <div className="container">
      <div>arkstatus.com</div>

      <section className="mt-3">
        <ServersList
          servers={servers}
          onClickUpdateStatus={setServerIdPendingUpdate}
        />
      </section>

      {serverIdPendingUpdate != "" ? (
        <ReportStatusModal
          serverName={serverIdPendingUpdate}
          defaultStatus={
            findServerById(serverIdPendingUpdate)?.status ?? "Offline"
          }
          onClose={(
            save: boolean,
            serverName: string,
            serverStatus: string
          ) => {
            setServerIdPendingUpdate("");

            if (save) {
              apiService
                .UpdateServerStatus(serverName, serverStatus)
                .finally(reloadServerList);
            }
          }}
        />
      ) : (
        <></>
      )}

      <section className="mt-3">
        <Disclaimers />
      </section>
    </div>
  );
}

export default App;
