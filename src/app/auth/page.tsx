"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase/client";
import { useSession } from "../lib/supabase/SessionProvider";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const user = session?.user ?? null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Auth Page</h1>
      <p className="text-lg mb-4">Sign in or sign up to manage your tasks.</p>
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-green-700">Signed in as <span className="font-semibold">{user.email}</span></p>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {loading ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border px-3 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      )}
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </main>
  );
}
