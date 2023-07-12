import { portal } from '../../../../src';
import { PartialPortal } from './partial-portal';
import { TimedPortal } from './timed-portal';

export function Content() {
  const showTimedNotification = () => {
    portal.show(<TimedPortal timeout={2000} />, {
      timeout: 2000,
    });
  };

  const showPartialNotification = () => {
    portal.show(<PartialPortal />, {
      size: { width: '100vw', height: '200px' },
      position: { left: '0', bottom: '0' },
    });
  };

  return (
    <div className="flex-1 bg-slate-900">
      <section className="w-3/4 p-5 mx-auto mt-20 border border-indigo-900 rounded-md text-slate-200">
        <h1 className="mb-5 text-xl font-bold">This Example</h1>

        <p className="my-5">Contains 3 different types of portal usage.</p>

        <ol className="pl-5 space-y-5 list-decimal">
          <li className="p-2 rounded-lg bg-slate-950">
            <h1 className="text-lg font-semibold">
              Portal as a notification/modal
            </h1>
            <p className="my-2">
              Used to show any custom component as a modal. It has two base
              options: closed by a timeout or by a user
            </p>
            <i>
              Look at <b>at the start page (useEffect) </b> and{' '}
              <b>Show Timed Notification</b> button
            </i>
          </li>

          <li className="p-2 rounded-lg bg-slate-950">
            <h1 className="text-lg font-semibold">Portal as a form</h1>
            <p className="my-2">
              It shows that you can pass or receive data from your portals
            </p>
            <i>
              Look at <b>Log In</b> and <b>Register</b> buttons
            </i>
          </li>

          <li className="p-2 rounded-lg bg-slate-950">
            <h1 className="text-lg font-semibold">
              Portal as a container put anyway on the page
            </h1>
            <p className="my-2">
              In this example is used as a standard information pin to the
              bottom of the page (something like cookie consent)
            </p>
            <i>
              Look at <b>Partial Notification</b> button
            </i>
          </li>
        </ol>

        <div className="flex justify-center mt-10 space-x-10">
          <button
            onClick={showTimedNotification}
            className="px-6 py-3 mt-5 bg-indigo-900 rounded-md hover:bg-indigo-800"
          >
            Show Timed Notification
          </button>
          <button
            onClick={showPartialNotification}
            className="px-6 py-3 mt-5 bg-indigo-900 rounded-md hover:bg-indigo-800"
          >
            Partial Notification
          </button>
        </div>
      </section>
    </div>
  );
}
