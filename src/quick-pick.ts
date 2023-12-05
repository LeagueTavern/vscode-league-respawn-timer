import { window, commands, QuickPickItemKind } from "vscode";
import {
  COMMAND_DISABLE_TIMER,
  COMMAND_ENABLE_TIMER,
  COMMAND_SHOW_CONFIG,
} from "./const";

import type { QuickPickItem } from "vscode";

export function openQuickPick() {
  return window
    .showQuickPick(
      [
        {
          label: "$(lrt-leagueoflegends-online) Enable Respawn Timer",
          detail: "Enable League Respawn Timer",
          meta: {
            script: () => commands.executeCommand(COMMAND_ENABLE_TIMER),
          },
        },
        {
          label: "$(lrt-leagueoflegends-disabled) Disable Respawn Timer",
          detail: "Disable League Respawn Timer",
          meta: {
            script: () => commands.executeCommand(COMMAND_DISABLE_TIMER),
          },
        },
        {
          label: "",
          kind: QuickPickItemKind.Separator,
        },
        {
          label: "$(settings-gear) Configurations",
          detail: "Configure League Respawn Timer",
          meta: {
            script: () =>
              commands.executeCommand(
                COMMAND_SHOW_CONFIG,
                "league-respawn-timer"
              ),
          },
        },
      ],
      {
        title: "League Respawn Timer Options",
        canPickMany: false,
      }
    )
    .then((item?: QuickPickItem) => {
      if (item) {
        const meta = (
          item as QuickPickItem & { meta: Record<"script", () => void> }
        ).meta;
        const script = meta.script;
        script();
      }
    });
}
