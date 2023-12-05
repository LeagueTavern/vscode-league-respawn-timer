import Nanobus from "nanobus";
import { APIClient } from "./api";

import type { IGameEvent, IResponseEventData } from "./api.d";

type GameEventListenerEvent = {
  connected: () => void;
  disconnected: () => void;
  event: (event: IGameEvent) => void;
};

export const GameEventListener =
  new (class GameEventListener extends Nanobus<GameEventListenerEvent> {
    private allowConnect = false;
    private isConnected = false;
    private lastEventID = -1;

    enable() {
      if (this.allowConnect) {
        return false;
      }

      const loop = () => {
        if (!this.allowConnect) {
          return;
        }

        APIClient.getGameEventData()
          .then(
            ({ data }) => this.allowConnect && this.onEventDataReceived(data)
          )
          .then(() => {
            if (this.allowConnect && !this.isConnected) {
              this.isConnected = true;
              this.emit("connected");
            }
          })
          .catch(() => {
            if (this.allowConnect && this.isConnected) {
              this.isConnected = false;
              this.lastEventID = 0;
              this.emit("disconnected");
            }
          })
          .finally(() => {
            this.allowConnect &&
              setTimeout(loop, this.isConnected ? 1000 : 5000);
          });
      };

      this.allowConnect = true;
      this.reset();
      loop();

      return true;
    }

    disable() {
      if (!this.allowConnect) {
        return false;
      }

      this.allowConnect = false;
      this.isConnected && this.emit("disconnected");
      return true;
    }

    isGameConnected() {
      return this.isConnected;
    }

    isEnable() {
      return this.allowConnect;
    }

    private reset() {
      this.lastEventID = -1;
      this.isConnected = false;
    }

    private onEventDataReceived(data: IResponseEventData) {
      const newEvents = data.Events.filter(
        (event) => event.EventID > this.lastEventID
      );
      const getLastEventID = () =>
        data.Events.length > 0
          ? data.Events[data.Events.length - 1].EventID
          : -1;

      if (newEvents.length === 0) {
        return;
      }

      if (this.lastEventID === -1) {
        this.lastEventID = getLastEventID();
        return;
      }

      this.lastEventID = getLastEventID();
      newEvents.forEach((event) => this.emit("event", event));
    }
  })();
