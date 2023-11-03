import ServerStatusModel from "../models/ServerStatusModel.ts";

export default class ApiService {
  private readonly ApiBaseUrl: string;

  constructor(ApiBaseUrl: string) {
    this.ApiBaseUrl = ApiBaseUrl;
  }

  public async GetServers(): Promise<ServerStatusModel[]> {
    return fetch(this.ApiBaseUrl + "/servers").then((response) =>
      response.json()
    );
  }

  public async UpdateServerStatus(serverName: string, serverStatus: string) {
    return fetch(this.ApiBaseUrl + "/server", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serverName: serverName,
        serverStatus: serverStatus,
      }),
    });
  }
}
