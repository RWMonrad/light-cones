export default function TestPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl text-white font-bold mb-4">Test Page Working</h1>
      <p className="text-xl text-gray-300 mt-4">
        This page confirms that Next.js routing is configured correctly.
      </p>
      <a href="/" className="text-blue-400 mt-8 hover:underline">
        Return to Home
      </a>
    </div>
  );
}
