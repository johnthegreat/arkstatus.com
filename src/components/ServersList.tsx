import ServerStatusModel from "../models/ServerStatusModel.ts";

export default function ServersList(props: {
  servers: ServerStatusModel[];
  onClickUpdateStatus: (serverId: string) => void;
}) {
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Server</th>
            <th>Status</th>
            <th>Last Report</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.servers.map(function (server) {
            return (
              <tr key={server.server_name} data-id={server.server_name}>
                <td>{server.server_name}</td>
                <td
                  className={
                    server.status === "Online" ? "text-success" : "text-danger"
                  }
                >
                  {server.status}
                </td>
                <td>{server.last_updated}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm bg-primary text-white"
                    onClick={() =>
                      props.onClickUpdateStatus(server.server_name)
                    }
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
