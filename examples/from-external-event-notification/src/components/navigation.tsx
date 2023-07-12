export function Navigation() {
  return (
    <nav className="flex items-center justify-end w-full p-5 bg-slate-900 h-14">
      <div className="flex items-center space-x-5 text-slate-200">
        <h1 className="font-bold">user@portify.com</h1>
        <button
          onClick={() => alert('Log Out')}
          className="px-3 py-1 rounded-md text-slate-300 bg-slate-600 w-28"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
