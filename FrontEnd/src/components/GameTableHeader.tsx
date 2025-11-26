type GameTableHeaderProps = {
    names: string[];
    totalWindsByPlayer: Record<string, number>;
}

export default function GameTableHeader({ names, totalWindsByPlayer }: GameTableHeaderProps) {
    return (
        <thead>
            <tr>
                <th style={{
                    border: '1px solid black',
                    padding: '8px',
                    backgroundColor: '#f0f0f0',
                    fontWeight: 'bold'
                }}>
                </th>
                {names.map((name, index) => (
                    <th key={index} style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: '#f0f0f0',
                        fontWeight: 'bold'
                    }}>
                        {name + ` (${totalWindsByPlayer[name]})`}
                    </th>
                ))}
            </tr>
        </thead>
    );
}