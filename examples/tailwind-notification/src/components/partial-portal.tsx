import { portal } from '../../../../src';

export function PartialPortal() {
  return (
    <div className="bg-slate-800 p-5 text-slate-200 space-y-5 border-t border-slate-600">
      <h1 className="font-bold text-xl">Partial Notification</h1>
      <p className="text-lg">
        This partial notification can be used to show cookies constent to user.
      </p>
      <div className="flex space-x-5">
        <button
          onClick={() => portal.dismiss()}
          className="bg-blue-900 rounded-md py-1 px-5"
        >
          Accept
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-900 rounded-md py-1 px-5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
