import type { AllGameStats } from "../types/Types"
import SingleGameStats from "./SingleGameStats";

type GameStatsProps = {
    stats: AllGameStats;
    names: string[];
}

export default function GameStats({ stats, names }: GameStatsProps) {

    return (
        <>
            <h2>Game Statistics</h2>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <SingleGameStats stats={stats.zip} names={names} gameType="zip" />
                <SingleGameStats stats={stats.tango} names={names} gameType="tango" />
            </div>
        </>
    );
}