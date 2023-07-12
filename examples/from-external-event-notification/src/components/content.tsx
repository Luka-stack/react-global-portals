export function Content() {
  return (
    <main className="flex-1 bg-slate-900">
      <section className="w-3/4 p-5 mx-auto mt-20 border border-indigo-900 rounded-md text-slate-200">
        <h1 className="mb-5 text-2xl font-bold">React-Portify</h1>
        <h2 className="mb-5 text-xl font-bold">
          Using portals from outside of components
        </h2>
        <p>
          This example mimics events received from outside sources. Sometimes we
          cannot run all of out modals/notifications from within components,
          sometimes we just must call them from separated functions, for
          example.
        </p>
        <h2 className="my-5 text-xl font-bold">How to use this example</h2>
        <ol className="px-5 list-decimal">
          <li>Open console</li>
          <li>Inside your console you have access to:</li>

          <p className="mt-5">
            This function will show notifications until you user closes it.
          </p>
          <p className="p-2 my-2 italic bg-slate-950 text-slate-500">
            extermalEvent.sendText(textToShow: string);
          </p>

          <p className="mt-5">
            This function will show notifications for a short period.
          </p>
          <p className="p-2 my-2 italic bg-slate-950 text-slate-500">
            extermalEvent.sendText(textToShow: string, true);
          </p>

          <p className="mt-5">
            This function will show notifications on top of other messages for a
            short period. But when the tab loses focus, the timer will stop
          </p>
          <p className="p-2 my-2 italic bg-slate-950 text-slate-500">
            extermalEvent.important(textToShow: string);
          </p>
        </ol>
      </section>
    </main>
  );
}
