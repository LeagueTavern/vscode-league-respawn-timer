import { StatusBarAlignment, ThemeColor, window } from "vscode";
import { COMMAND_SHOW_MENU } from "./const";

export enum StatusBarStatus {
  NotConnected = 1,
  Connected = 2,
  Timing = 3,
  Disabled = 4,
}

export const StatusBar = new (class StatusBar {
  private statusBarStatus!: StatusBarStatus;
  private statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right);
  private statusBarTimingValue = 0;
  private statusBarNameValue = "";

  constructor() {
    this.statusBarItem.command = COMMAND_SHOW_MENU;
    this.setStatus(StatusBarStatus.Disabled);
  }

  public setStatus(status: StatusBarStatus.Disabled): void;
  public setStatus(status: StatusBarStatus.NotConnected): void;
  public setStatus(status: StatusBarStatus.Timing): void;
  public setStatus(status: StatusBarStatus.Connected, name?: string): void;
  public setStatus(
    status: StatusBarStatus,
    name: string = this.statusBarNameValue
  ): void {
    this.statusBarStatus = status;
    switch (status) {
      case StatusBarStatus.Connected: {
        this.statusBarNameValue = name!;
        this.statusBarItem.text = `$(lrt-champion) ${name}`;
        this.statusBarItem.tooltip = `League Respawn Timer - Player: ${name}`;
        this.statusBarItem.backgroundColor = new ThemeColor(
          "statusBarItem.fourgroundBackground"
        );
        break;
      }
      case StatusBarStatus.Timing: {
        this.statusBarItem.text = `$(lrt-timing) Calculating...`;
        this.statusBarItem.tooltip = `League Respawn Timer - Timing`;
        this.statusBarItem.backgroundColor = new ThemeColor(
          "statusBarItem.warningBackground"
        );
        break;
      }
      case StatusBarStatus.Disabled: {
        this.statusBarItem.text = `$(lrt-leagueoflegends-disabled) Disabled`;
        this.statusBarItem.tooltip = `League Respawn Timer - Disabled`;
        this.statusBarItem.backgroundColor = new ThemeColor(
          "statusBarItem.fourgroundBackground"
        );
        break;
      }
      default: {
        this.statusBarItem.text = `$(lrt-leagueoflegends-online) Ready`;
        this.statusBarItem.tooltip = `League Respawn Timer - Ready`;
        this.statusBarItem.backgroundColor = new ThemeColor(
          "statusBarItem.fourgroundBackground"
        );
      }
    }
    this.statusBarItem.show();
  }

  public updateTimingValue(value: number) {
    this.statusBarTimingValue = value;

    if (this.statusBarStatus === StatusBarStatus.Timing) {
      this.statusBarItem.text = `$(lrt-timing) Respawn in ${this.statusBarTimingValue}s`;
      this.statusBarItem.backgroundColor = new ThemeColor(
        value % 2 === 0
          ? "statusBarItem.errorBackground"
          : "statusBarItem.warningBackground"
      );
    }
  }

  public show() {
    this.statusBarItem.show();
  }

  public hide() {
    this.statusBarItem.hide();
  }
})();
