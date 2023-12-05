import { commands } from "vscode";
import { GameEventListener } from "./game-event-listener";
import { StatusBar, StatusBarStatus } from "./status-bar";
import {
  COMMAND_DISABLE_TIMER,
  COMMAND_ENABLE_TIMER,
  COMMAND_SHOW_MENU,
  CONFIG_ENABLE,
} from "./const";
import { openQuickPick } from "./quick-pick";

import type { ExtensionContext } from "vscode";
import { setConfiguration } from "./config";

export function registerCommands(context: ExtensionContext) {
  const enableTimer = () => {
    if (GameEventListener.enable()) {
      StatusBar.setStatus(StatusBarStatus.NotConnected);
      setConfiguration(CONFIG_ENABLE, true);
    }
  };

  const disableTimer = () => {
    if (GameEventListener.disable()) {
      StatusBar.setStatus(StatusBarStatus.Disabled);
      setConfiguration(CONFIG_ENABLE, false);
    }
  };

  const enableTimerCommand = commands.registerCommand(
    COMMAND_ENABLE_TIMER,
    enableTimer
  );
  const disableTimerCommand = commands.registerCommand(
    COMMAND_DISABLE_TIMER,
    disableTimer
  );
  const showMenuCommand = commands.registerCommand(
    COMMAND_SHOW_MENU,
    openQuickPick
  );

  context.subscriptions.push(
    enableTimerCommand,
    disableTimerCommand,
    showMenuCommand
  );
}
