import { registerCommands } from "./commands";
import { registerEvents } from "./event-handler";
import { registerConfig } from "./config";

import type { ExtensionContext } from "vscode";

export function activate(context: ExtensionContext) {
  registerCommands(context);
  registerConfig(context);
  registerEvents();
}

export function deactivate() {}
