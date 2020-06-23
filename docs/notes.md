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
