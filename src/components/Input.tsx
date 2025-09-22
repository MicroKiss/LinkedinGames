
type InputProps = {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function Input({ label, id, type, value, onChange }: InputProps) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} value={value} onChange={onChange} />
        </>
    );
}