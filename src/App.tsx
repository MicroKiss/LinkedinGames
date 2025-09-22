
import InputForm from './components/InputForm'
import GameStats from './components/GameStats'
import { useEffect, useState } from 'react';
import type { AllGameStats } from './types/Types';


const exampleRecords = [
  { username: 'user1', date: '2023-01-01', time: '10:00' },
  { username: 'user2', date: '2023-01-01', time: '13:00' },
  { username: 'user1', date: '2023-01-02', time: '11:00' },
  { username: 'user3', date: '2023-01-02', time: '8:00' },

];


function App() {
  const [stats, setStats] = useState<AllGameStats>({
    zip: {
      records: exampleRecords
    }, tango: { records: exampleRecords }
  });
  const [names, setNames] = useState<string[]>([]);


  useEffect(() => {
    const uniqueNames = Array.from(new Set(stats.zip.records.map(record => record.username).concat(stats.tango.records.map(record => record.username))));
    setNames(uniqueNames);
  }, [stats]);

  const handleNewSubmit = (username: string, date: string, time: string, gameType: 'zip' | 'tango') => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      if (!newStats[gameType].records.find(record => record.username === username && record.date === date)) {
        newStats[gameType].records.push({ username, date, time });
      } else {
        newStats[gameType].records = newStats[gameType].records.map(record => {
          if (record.username === username && record.date === date) {
            return { ...record, time };
          }
          return record;
        });
      }
      return newStats;
    });
  }

  return (
    <>
      <InputForm onSubmit={handleNewSubmit} />
      <GameStats stats={stats} names={names} />
    </>
  )
}

export default App
