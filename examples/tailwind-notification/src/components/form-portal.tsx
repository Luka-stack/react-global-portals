import { useState } from 'react';
import { portal } from '../../../../src';

type Props = {
  title: string;
  setUser: (name: string) => void;
};

export function FormPortal({ title, setUser }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.length || !password.length) {
      setError('Both email and password must be provided');
      return;
    }

    setUser(email);
    portal.dismiss();
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div
        onClick={() => portal.dismiss()}
        className="absolute w-full h-full z-10 backdrop-blur-sm bg-transparent"
      ></div>

      <form
        onSubmit={onSubmit}
        className="bg-slate-800 shadow-lg rounded-md w-1/3 aspect-video p-5 text-slate-200 z-20 flex flex-col items-center space-y-5"
      >
        <h1 className="font-bold text-lg">{title}</h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            className="py-1 px-2 rounded-md w-60"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Strong Password"
            className="py-1 px-2 rounded-md w-60 text-slate-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="w-60 text-sm text-red-500 font-semibold">{error}</p>
        )}

        <input
          type="submit"
          value="Connect"
          className="bg-blue-900 w-60 rounded-md py-1 cursor-pointer"
        />
      </form>
    </div>
  );
}
