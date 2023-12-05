import axios from "axios";
import https from "https";

import {
  IResponseActivePlay,
  IResponseEventData,
  IResponseGamestats,
} from "./api.d";

const client = axios.create({
  baseURL: "https://127.0.0.1:2999/",
  timeout: 5000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
export class APIClient {
  static getGameEventData() {
    return client.get<IResponseEventData>("/liveclientdata/eventdata");
  }

  static getActivePlayer() {
    return client.get<IResponseActivePlay>("/liveclientdata/activeplayer");
  }

  static getGameStats() {
    return client.get<IResponseGamestats>("/liveclientdata/gamestats");
  }
}
