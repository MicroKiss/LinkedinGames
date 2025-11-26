import { useState } from 'react'
import Input from "./Input";

type InputFormProps = {
    onSubmit: (username: string, date: string, time: string, gameType: 'zip' | 'tango') => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {

    const [username, setUsername] = useState('');
    const [zip, setZip] = useState('');
    const [tango, setTango] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username && (!zip || !tango)) {
            alert("Please fill in all fields.");
            return;
        }
        if (zip) {
            onSubmit(username, new Date(date).toISOString().split('T')[0], zip, 'zip');
        }
        if (tango) {
            onSubmit(username, new Date(date).toISOString().split('T')[0], tango, 'tango');
        }

        setTango('');
        setZip('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Username" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input label="Zip" id="zip" type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
            <Input label="Tango" id="tango" type="text" value={tango} onChange={(e) => setTango(e.target.value)} />
            <Input label="Date" id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
}
