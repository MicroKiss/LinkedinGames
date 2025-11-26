
import InputForm from './components/InputForm'
import GameStats from './components/GameStats'
import { useEffect, useState } from 'react';
import type { AllGameStats } from './types/Types';
import useApi from './ApiService/useApi';


const exampleRecords = [
  { username: 'user1', date: '2023-01-01', time: '10:00' },
  { username: 'user2', date: '2023-01-01', time: '13:00' },
  { username: 'user1', date: '2023-01-02', time: '11:00' },
  { username: 'user3', date: '2023-01-02', time: '8:00' },

];


function App() {
  const api = useApi();
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const available = await api.checkHealth();
        setIsBackendAvailable(available);
        console.log('Backend health check:', available ? 'Success' : 'Failed');
      } catch (error) {
        console.error('Backend health check error:', error);
        setIsBackendAvailable(false);
      }
    };
    checkBackend();
  }, [api]);



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
      <div style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        {isBackendAvailable ? '🟢 Connected to backend' : '🔴 Using offline mode'}
      </div>
      <InputForm onSubmit={handleNewSubmit} />
      <GameStats stats={stats} names={names} />
    </>
  )
}

export default App
