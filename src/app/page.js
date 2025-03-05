import Link from "next/link";


export default function Home() {
  return (
    <div>
        <h2>Hello, Guyz</h2>
        <Link className="text-blue-400" href="/dashboard">Dashboard</Link>
    </div>
  );
}
