import { registerCommands } from "./commands";
import { registerEvents } from "./event-handler";
import { RegisterConfig } from "./config";

import type { ExtensionContext } from "vscode";

export function activate(context: ExtensionContext) {
  registerCommands(context);
  RegisterConfig(context);
  registerEvents();
}

export function deactivate() {}
