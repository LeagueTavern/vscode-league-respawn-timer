import { window } from "vscode";
import { getConfiguration } from "./config";
import { CONFIG_ENABLE_NOTIFICATION } from "./const";

export const Notication = new (class Notication {
  isVisible() {
    return getConfiguration(CONFIG_ENABLE_NOTIFICATION) as boolean;
  }

  respawn() {
    this.isVisible() &&
      window.showInformationMessage(`You have respawned, return to the game!`);
  }

  failedToLoadSummonerInfo() {
    this.isVisible() &&
      window.showErrorMessage(`Failed to load summoner info.`);
  }
})();
