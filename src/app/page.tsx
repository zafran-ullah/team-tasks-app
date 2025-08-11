import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">My Tasks App</h1>
      <p className="text-lg mb-8">Welcome to the Home page.</p>
      <div className="flex gap-4">
        <Link href="/auth" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Auth</Link>
        <Link href="/tasks" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Tasks</Link>
      </div>
    </main>
  );
}
