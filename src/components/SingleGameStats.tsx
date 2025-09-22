import type { GameStat, SingleRecord } from '../types/Types';
import GameTableRow from './GameTableRow';
import GameTableHeader from './GameTableHeader';

type SingleGameStatsProps = {
    stats: GameStat;
    gameType: 'zip' | 'tango';
    names: string[];
}

export default function SingleGameStats({ stats, gameType, names }: SingleGameStatsProps) {

    const groupedByDate: Record<string, SingleRecord[]> = stats.records.reduce((acc: Record<string, SingleRecord[]>, record) => {
        if (!acc[record.date]) {
            acc[record.date] = [record];
        } else {
            acc[record.date].push(record);
        }
        return acc;
    }, {} as Record<string, SingleRecord[]>);

    const sortedData = Object.keys(groupedByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map(date => ({ date, records: groupedByDate[date] }));

    const getPlayerTime = (date: string, playerName: string) => {
        const dayRecords = groupedByDate[date];
        const playerRecord = dayRecords?.find(record => record.username === playerName);
        return playerRecord?.time || '';
    };

    const totalWinsByPlayer: Record<string, number> = names.reduce((acc, name) => {
        acc[name] = 0;
        return acc;
    }, {} as Record<string, number>);

    sortedData.forEach(day => {
        // Find the best (minimum) time for the day
        const bestTime = Math.min(...day.records.map(record => parseFloat(record.time)));

        // Find all players who achieved the best time (handling ties)
        const winners = day.records.filter(record => parseFloat(record.time) === bestTime);

        // Award a win to each player who tied for the best time
        winners.forEach(winner => {
            if (winner.username in totalWinsByPlayer) {
                totalWinsByPlayer[winner.username] += 1;
            }
        });
    });

    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h2>{gameType}</h2>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid black',
                marginTop: '10px'
            }}>
                <GameTableHeader names={names} totalWindsByPlayer={totalWinsByPlayer} />
                <tbody>
                    {sortedData.map((singleDay: { date: string, records: SingleRecord[] }) => (
                        <GameTableRow key={singleDay.date} date={singleDay.date} items={names.map(name => getPlayerTime(singleDay.date, name))} />
                    ))}
                </tbody>
            </table>
        </div>

    );

}
