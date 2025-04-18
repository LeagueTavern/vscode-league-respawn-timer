
export type IGameEvent =
  | {
    EventID: number;
    EventName: "GameStart";
    EventTime: number;
  }
  | {
    EventID: number;
    EventName: "MinionsSpawning";
    EventTime: number;
  }
  | {
    EventID: number;
    EventName: "InhibRespawned";
    EventTime: number;
    InhibRespawned: "Barracks_T2_C1";
  }
  | {
    EventID: number;
    EventName: "InhibRespawningSoon";
    EventTime: number;
    InhibRespawningSoon: string;
  }
  | {
    EventID: number;
    EventName: "FirstBrick";
    EventTime: number;
    KillerName: string;
  }
  | {
    EventID: number;
    EventName: "TurretKilled";
    EventTime: number;
    TurretKilled: "Turret_T2_L_03_A";
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "InhibKilled";
    EventTime: number;
    InhibKilled: "Barracks_T2_R1";
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "DragonKill";
    EventTime: number;
    DragonType: "Earth";
    Stolen: "False" | "True";
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "DragonKill";
    EventTime: number;
    DragonType: "Elder";
    Stolen: "False" | "True";
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "HeraldKill";
    EventTime: number;
    Stolen: "False" | "True";
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "BaronKill";
    EventTime: number;
    Stolen: "False" | "True";
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "ChampionKill";
    EventTime: number;
    VictimName: string;
    KillerName: string;
    Assisters: string[];
  }
  | {
    EventID: number;
    EventName: "Multikill";
    EventTime: number;
    KillerName: string;
    KillStreak: number;
  }
  | {
    EventID: number;
    EventName: "Ace";
    EventTime: number;
    Acer: string;
    AcingTeam: string;
  };

export type IResponseActivePlay = {
  abilities: Record<
    "Q" | "W" | "E" | "R",
    Record<
      "displayName" | "id" | "rawDescription" | "rawDisplayName",
      string
    > & { abilityLevel: number }
  > & {
    Passive: Record<
      "displayName" | "id" | "rawDescription" | "rawDisplayName",
      string
    >;
  };
  championStats: Record<
    | "abilityHaste"
    | "abilityPower"
    | "armor"
    | "armorPenetrationFlat"
    | "armorPenetrationPercent"
    | "attackDamage"
    | "attackRange"
    | "attackSpeed"
    | "bonusArmorPenetrationPercent"
    | "bonusMagicPenetrationPercent"
    | "critChance"
    | "critDamage"
    | "currentHealth"
    | "healShieldPower"
    | "healthRegenRate"
    | "lifeSteal"
    | "magicLethality"
    | "magicPenetrationFlat"
    | "magicPenetrationPercent"
    | "magicResist"
    | "maxHealth"
    | "moveSpeed"
    | "omnivamp"
    | "physicalLethality"
    | "physicalVamp"
    | "resourceMax"
    | "resourceRegenRate"
    | "resourceType"
    | "resourceValue"
    | "spellVamp"
    | "tenacity",
    number
  >;
  currentGold: number;
  fullRunes: {
    generalRunes: {
      displayName: string;
      id: number;
      rawDescription: string;
      rawDisplayName: string;
    }[];
    statRunes: {
      id: number;
      rawDescription: string;
    }[];
  } & Record<
    "keystone" | "primaryRuneTree" | "secondaryRuneTree",
    {
      displayName: string;
      id: number;
      rawDescription: string;
      rawDisplayName: string;
    }
  >;
  level: number;
  summonerName: string;
  riotId: string;
  riotIdGameName: string;
  riotIdTagLine: string;
  teamRelativeColors: boolean;
};

export type IResponseGamestats = {
  gameMode: string;
  gameTime: number;
  mapName: string;
  mapNumber: number;
  mapTerrain: string;
};

export type IResponseEventData = {
  Events: IGameEvent[];
};