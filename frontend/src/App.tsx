// Removed unused React import
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans">
      <header className="shadow-md py-4 px-6 bg-white flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">Matrix AI Dashboard</h1>
        <span className="text-sm text-gray-500">v1.0</span>
      </header>

      <main className="flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-5xl">
          <Dashboard />
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} Powered by Matrix + AI · Built by You 🚀
      </footer>
    </div>
  );
}

export default App;