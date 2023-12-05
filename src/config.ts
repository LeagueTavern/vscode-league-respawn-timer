import { workspace, commands } from "vscode";
import {
  COMMAND_DISABLE_TIMER,
  COMMAND_ENABLE_TIMER,
  CONFIG_ENABLE,
} from "./const";

import type { ExtensionContext } from "vscode";

export function RegisterConfig(context: ExtensionContext) {
  const dynamicConfigLoad = () => {
    const enable = getConfiguration(CONFIG_ENABLE) as boolean;

    enable
      ? commands.executeCommand(COMMAND_ENABLE_TIMER)
      : commands.executeCommand(COMMAND_DISABLE_TIMER);
  };

  workspace.onDidChangeConfiguration(dynamicConfigLoad);
  dynamicConfigLoad();
}

export function getConfiguration(key: string) {
  return workspace.getConfiguration().get(key);
}

export function setConfiguration(key: string, value: unknown) {
  const config = workspace.getConfiguration();
  if (config.get(key) !== value) {
    return config.update(key, value);
  }
}
