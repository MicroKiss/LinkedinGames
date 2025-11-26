
type GameTableRowProps = {
    date: string;
    items: string[];
}


export default function GameTableRow({ date, items }: GameTableRowProps) {

    // Find the best (minimum) time among all valid times
    const validTimes = items.filter(time => time !== '').map(time => parseFloat(time));
    const bestTime = validTimes.length > 0 ? Math.min(...validTimes) : null;

    return (
        <tr key={date}>
            <td style={{
                border: '1px solid black',
                padding: '8px',
                fontWeight: 'bold'
            }}>
                {date}
            </td>
            {items.map((time, index) => {
                const isWinner = time !== '' && bestTime !== null && parseFloat(time) === bestTime;
                return (
                    <td key={index} style={{
                        border: '1px solid black',
                        padding: '8px',
                        color: isWinner ? 'green' : 'black',
                        fontWeight: isWinner ? 'bold' : 'normal',
                        textAlign: 'center'
                    }}>
                        {time}
                    </td>
                );
            })}
        </tr>
    );
};