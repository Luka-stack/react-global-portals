import { portal } from '../../../../src';

type Props = {
  timeout: number;
};

export function TimedPortal({ timeout }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute z-10 w-full h-full bg-transparent backdrop-blur-sm"></div>

      <div className="z-20 w-1/2 p-5 rounded-md shadow-lg bg-slate-800 aspect-video text-slate-200">
        <h1 className="mb-5 text-xl font-bold">Timed Notification Example</h1>
        <p className="text-lg">
          This notification will disappear in {timeout} milliseconds. But you
          can dismiss it on your own by clicking the button below.
        </p>
        <button
          className="w-full py-2 mt-5 font-semibold bg-blue-900 rounded-md"
          onClick={() => portal.dismiss()}
        >
          Dismiss and proceed
        </button>
      </div>
    </div>
  );
}
