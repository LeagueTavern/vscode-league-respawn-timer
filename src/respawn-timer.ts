import Nanobus from "nanobus";
import { APIClient } from "./api";

import type { IResponseActivePlay, IResponseGamestats } from "./api.d";

type RespawnTimerEvent = {
  dead: () => void;
  update: (time: number) => void;
  respawn: () => void;
};

export const RespawnTimer =
  new (class RespawnTimer extends Nanobus<RespawnTimerEvent> {
    private deatRealTime = 0;
    private deadGameTime = 0;
    private gameMode = "";
    private respawnTime = 0;
    private remainingTimeInterval: NodeJS.Timeout | null = null;
    private summonerName = "";

    init() {
      return new Promise<string>((resolve, reject) => {
        const onStatsLoaded = (
          activePlayer: IResponseActivePlay,
          gameStats: IResponseGamestats
        ) => {
          this.gameMode = gameStats.gameMode;
          this.summonerName = activePlayer.summonerName;
          return activePlayer.summonerName;
        };

        Promise.all([APIClient.getActivePlayer(), APIClient.getGameStats()])
          .then(([activePlayer, gameStats]) => ({
            player: activePlayer.data,
            stats: gameStats.data,
          }))
          .then(({ player, stats }) => onStatsLoaded(player, stats))
          .then(resolve)
          .catch(reject);
      });
    }

    start(time: number) {
      return new Promise<number>((resolve, reject) => {
        this.deadGameTime = time;
        this.deatRealTime = Date.now();

        APIClient.getActivePlayer()
          .then(({ data }) => {
            this.respawnTime =
              this.deatRealTime +
              this.calcaulateRespawnRemainTime(
                this.gameMode,
                this.deadGameTime,
                data.level
              ) *
                1000;

            this.createTimer();
            return this.respawnTime;
          })
          .then(resolve)
          .catch(reject);
      });
    }

    createTimer() {
      const onRespawnEvent = () => {
        this.clearTimer();
        this.emit("respawn");
      };

      const onTimerLoopEvent = () => {
        const currentTime = new Date().getTime();
        const remainTime = Math.floor((this.respawnTime - currentTime) / 1000);

        this.emit("update", remainTime);

        if (remainTime <= 0) {
          onRespawnEvent();
        } else {
          APIClient.getActivePlayer()
            .then(
              ({ data }) =>
                data.championStats.currentHealth !== 0 && onRespawnEvent()
            )
            .catch(() => {});
        }
      };

      this.emit("dead");
      this.clearTimer();
      this.remainingTimeInterval = setInterval(onTimerLoopEvent, 1000);
      onTimerLoopEvent();
    }

    clearTimer() {
      clearInterval(this.remainingTimeInterval!);
      this.remainingTimeInterval = null;
    }

    calcaulateRespawnRemainTime(mode: string, gameTime: number, level: number) {
      // https://leagueoflegends.fandom.com/wiki/Death

      switch (mode) {
        case "ARAM": {
          return level * 2 + 4;
        }
        default: {
          const calcTimeIncreaseFactor = (gameTime: number) => {
            const currentMinutes = gameTime / 60;

            if (currentMinutes < 15) {
              return 0;
            } else if (currentMinutes < 30) {
              return (Math.ceil(2 * (currentMinutes - 15)) * 0.425) / 100;
            } else if (currentMinutes < 45) {
              return (
                0.1275 + (Math.ceil(2 * (currentMinutes - 30)) * 0.3) / 100
              );
            } else {
              return (
                0.2175 +
                (Math.ceil(2 * (Math.min(currentMinutes, 55) - 45)) * 1.45) /
                  100
              );
            }
          };

          // Level 1-18
          const baseRespawnTimeMap = [
            6, 6, 8, 8, 10, 12, 16, 21, 26, 32.5, 35, 37.5, 40, 42.5, 45, 47.5,
            50, 52.5,
          ];

          // TIF & BRW
          const timeIncreaseFactor = calcTimeIncreaseFactor(gameTime);
          const baseRespawnWaittime = baseRespawnTimeMap[level - 1];

          // result
          const deathTime =
            baseRespawnWaittime + baseRespawnWaittime * timeIncreaseFactor;
          return Math.floor(deathTime);
        }
      }
    }

    getSummonerName() {
      return this.summonerName;
    }
  })();
