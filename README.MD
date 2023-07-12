# React-Global-Portals

💖 React-Global-Portals takes from you all worries related to show notifications/modal etc. on top of everything 💖

## ❯ Instalation

```bash
$ yarn add react-global-portals
```

or

```bash
$ npm install react-global-portals
```

## ❯ Features

- Painless setup
- Effortless to use
- Use inside or outside of components
- Define position per portal
- Portals can be dismissed automatically
- Pause portal when the window losses focus
- Display any react component
- Can remove a portal programmatically
- Queue portals

## ❯ Small usage examples

It needs <b>\<PortalContainer /></b> to render portals. Example setup:

```javascript
export function App() {
    return (
        <div>
            <h1> React-Global-Portals </h1>
        </div>

        <PortalContainer /> // This is required
    )
}
```

A react component that will be used in examples listed below

```javascript
function ExampleComponent() {
  return (
    <div>
      <h1>Component</h1>
    </div>
  );
}
```

<!-- Add PortalContainer -->

## <i>portal.show</i>

portal.show - it shows component as a portal, if any portal is already shown it will queue the passed one and show it when the current is dismissed.

- It simply shows component on top.

```javascript
const portalId = portal.show(<ExampleComponent />);
```

- It shows component on top but with passed id

```javascript
const customPortalId = 'Portal Id';
const portalId = portal.show(<ExampleComponent />, { id: customPortalId });
// portalId === customPortalId
```

- We can add time in miliseconds when it should dismiss, and decide if timeout should be paused on focus loss

```javascript
const portalId = portal.show(<ExampleComponent />, {
  timeout: 2000,
  pauseOnFocusLoss: true,
});
```

- We can also change the position. By default, portal takes whole page but it can be easily changed

```javascript
const portalId = portal.show(<ExampleComponent />, {
  position: {
    width: '100vh',
    height: '50vh',
    bottom: '0',
  },
});
```

## <i>portal.forceShow</i>

portal.forceShow - allows to forcefully show portal, when any portal is already shown it will queue the current and show one thas was passed. Additionally, it can takes parameter of a type ForceAction that can be:

- <b>DismissNone</b> : default action, put current portal into queue and show one that was passed
- <b>DismissCurrent</b> : dismiss currently shown portal and show one that was passed
- <b>DismissQueue</b> : dismiss all portals that are queued, queue the current one and show one that was passed
- <b>DismissAll</b> : dismiss all portals (current and queued), and show one that was passed

- Show passed component on top, and queue currently shown (if any)

```javascript
const portalId = portal.forceShow(<ExampleComponent />);
```

- Additionally, portal has custom Id and it will dismiss ALL other portals

```javascript
const portalId = portal.forceShow(
  <ExampleComponent />,
  { id: 'CustomId' },
  'DismissAll'
);
```

- This one will be dismissed after 5000 ms

```javascript
const portalId = portal.forceShow(
  <ExampleComponent />,
  { timeout: 5000 },
  'DismissAll'
);
```

## <i>portal.dismiss</i>

portal.dismiss - dismiss portal or delete it from queue.

- Dismiss currently displayed portal

```javascript
portal.dismiss();
```

- Dismiss portal with identifier

```javascript
portal.dismiss('myPortal');
```

## <i>portal.dismissAll</i>

portal.dismissAll - it dismiss current portal and deletes all queued portals

```javascript
portal.dismissAll();
```

## Live Examples

At the moment examples are provided only inside <i>examples</i> folder

## License

Licensed under MIT
