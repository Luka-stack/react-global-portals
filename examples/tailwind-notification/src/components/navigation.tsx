import { useState } from 'react';
import { portal } from '../../../../src';
import { FormPortal } from './form-portal';

export function Navigation() {
  const [user, setUser] = useState('');

  return (
    <nav className="flex items-center justify-end w-full p-5 bg-slate-900 h-14">
      {user ? (
        <div className="flex items-center space-x-5 text-slate-200">
          <h1 className="font-bold">{user}</h1>
          <button
            onClick={() => setUser('')}
            className="px-3 py-1 rounded-md text-slate-300 bg-slate-600 w-28"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex space-x-5 ">
          <button
            onClick={() =>
              portal.forceShow(
                <FormPortal title={'Registration'} setUser={setUser} />
              )
            }
            className="w-20 px-3 py-1 rounded-md text-slate-300 bg-slate-600"
          >
            Register
          </button>

          <button
            onClick={() =>
              portal.forceShow(
                <FormPortal title={'Log In'} setUser={setUser} />
              )
            }
            className="w-20 px-3 py-1 rounded-md text-slate-300 bg-slate-600"
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}
