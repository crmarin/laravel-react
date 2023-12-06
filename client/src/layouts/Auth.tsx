// components

import Login from "@/views/auth/Login";

// views
export default function Auth() {
  return (
    <main>
      <section className="relative h-screen w-full py-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -space-x-52 dark:opacity-20  "
        >
          <div className="h-screen bg-gradient-to-tl from-purple-800 via-indigo-400 via-50% to-purple-300"></div>
        </div>
        <Login />
      </section>
    </main>
  );
}
