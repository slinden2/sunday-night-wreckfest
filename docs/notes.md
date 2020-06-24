# Notes

## Commands

### Server side

- `npm run build:server`: Builds the server side code in `/build` subdir
- `npm run build:watch`: As the former, but watches for file changes and rebuilds
- `npm run build:bundle`: Builds also the frontend code and puts it in `/build` subdir as a child
- `npm run start:bundle`: Starts the production bundle
- `npm run dev`: Runs the dev server and watches for file changes
- `npm run test`: Runs jest tests
- `npm run test:watch`: As above, but watches for file changes
- `npm run test:single`: Runs a single test (usage: `npm run test:single -- "<test-name>"`)
- `npm run view:coverage`: Serves the coverage report. Available in `http://localhost:5000`.
- `npm run clean`: Removes coverage reports and build directory
- `npm run lint`: Runs linter
- `npm run jest:clear_cache`: Clears Jest cache. Sometimes needed after file modifications.

### Client site

- `npm start`: Starts the React dev server
- `npm run build`: Builds the React projects
- `npm run lint`: Runs the linter

## Special endpoints

### Cache updates

By default the Redis cache is set to update every night at 3 o'clock by running `updateCache` from `backend/src/jobs/`. This is done via cronjob defined in the server entry point in the `listen` function.

If the DB spreadsheet is modified, the cache can be updated also manually by sending a `GET` request to `/api/races/updateCache/:hash`.

### Draw checking

When the event details are filled after an event, the draw checking has to be done before standings calculation. The draw checking is done by sending a `GET` request to `/api/races/update/:hash`. The draw condition is marked in the `drawPosition` column and must be solved manually.

### Standings calculation

The standings table in the DB spreadsheet is updated by sending a `GET` request to `/api/standings/update/:hash`. The event details must be correctly filled and `isReady` and `isCompleted` must be set to `1` before the calculation.

## DB usage

The usage of the DB spreadsheet is described in the spreadsheet itself.

## Deployment

There is a GitHub Action that takes care of the deployment. When there is a push or an pull request to the `master` branch, the action will run. The actions runs all the backend tests, creates the production bundle, pushed it back to the repo and also to the production server (dokku).
