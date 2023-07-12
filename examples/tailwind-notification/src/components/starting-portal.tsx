import { portal } from '../../../../src';

export function StartingPortal() {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="absolute w-full h-full z-10 backdrop-blur-sm bg-transparent"></div>

      <div className="bg-slate-800 shadow-lg rounded-md w-1/2 aspect-video p-5 text-slate-200 z-20">
        <h1 className="text-xl font-bold mb-5">React Portify Example</h1>
        <p className="text-lg">
          Application that shows how react-portify can be used in 'normal'
          application.
        </p>
        <button
          className="bg-blue-900 w-full py-2 rounded-md mt-5 font-semibold"
          onClick={() => portal.dismiss()}
        >
          Dismiss and proceed
        </button>
      </div>
    </div>
  );
}
