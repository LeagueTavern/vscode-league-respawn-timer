import { Notication } from "./notification";
import { RespawnTimer } from "./respawn-timer";
import { GameEventListener } from "./game-event-listener";
import { StatusBar, StatusBarStatus } from "./status-bar";

export function registerEvents() {
  GameEventListener.on("event", (event) => {
    switch (event.EventName) {
      case "ChampionKill": {
        if (event.VictimName === RespawnTimer.getRiotIdGameName()) {
          RespawnTimer.start(event.EventTime);
          StatusBar.setStatus(StatusBarStatus.Timing);
        }
        break;
      }
    }
  });

  GameEventListener.on("connected", () => {
    RespawnTimer.init()
      .then((riotIdGameName) =>
        StatusBar.setStatus(StatusBarStatus.Connected, riotIdGameName)
      )
      .catch(() => Notication.failedToLoadSummonerInfo());
  });

  GameEventListener.on("disconnected", () => {
    StatusBar.setStatus(StatusBarStatus.NotConnected);
    RespawnTimer.clearTimer();
  });

  RespawnTimer.on("update", (time) => {
    StatusBar.updateTimingValue(time);
  });

  RespawnTimer.on("dead", () => {});
  RespawnTimer.on("respawn", () => {
    StatusBar.setStatus(StatusBarStatus.Connected);
    Notication.respawn();
  });
}
