import { HomeIcon, HeartIcon } from '@heroicons/react/24/outline';

export function Sidebar() {
  return (
    <aside className="flex flex-col w-48 bg-slate-900 items-center space-y-3">
      <button
        onClick={() => alert('Link #1')}
        className="w-40 text-slate-200 flex items-center hover:bg-slate-50/10 rounded-md py-1.5 px-3"
      >
        <HomeIcon className="h-6 w-6 mr-4" />
        Link #1
      </button>

      <button
        onClick={() => alert('Link #2')}
        className="w-40 text-slate-200 flex items-center hover:bg-slate-50/10 rounded-md py-1.5 px-3"
      >
        <HeartIcon className="h-6 w-6 mr-4" />
        Link #2
      </button>
    </aside>
  );
}
