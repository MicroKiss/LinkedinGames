export type SingleRecord = {
    date: string;
    username: string;
    time: string;
}

export type GameStat = {
    records: SingleRecord[];
}

export type AllGameStats = {
    zip: GameStat;
    tango: GameStat;
}
