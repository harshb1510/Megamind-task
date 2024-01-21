import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-800 min-h-screen flex flex-col justify-center items-center text-white">
      <header className="text-4xl mb-6 min-[320px]:text-3xl font-bold">
        Welcome
      </header>
      <div className="space-y-6">
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300">
            <Link href="/signup">Create Account</Link>
          </button>
        </div>
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300">
            <Link href="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
