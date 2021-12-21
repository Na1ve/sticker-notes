# Sticky Notes

## Build
1. Clone repo
2. `npm i`
3. `npm run build` — at the end it says how to start app:
```
You may serve it with a static server:
  `npm install -g serve`
  `serve -s build`
```
## Architecture

UI Layer represents by components `StickyNote`, `CreateZone`, `TrashZone`. All of they assembled in `Desktop` component. Each UI compoment devided by view (CSS) and model (TSX).

Business Logic Layer concentrated in `Desktop` component. It resolve all actions of application (add/remove/edit).

Data Link Layer assembled in `App.tsx`. It get and post messages into transport services. `BaseTransport` communicate with localStorage, which can be replaced with some transfer client.
