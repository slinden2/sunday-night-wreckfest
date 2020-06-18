/* 
Script for creating the production bundle to run it locally.
Usually the production bundle is created in the CI, so this is not needed.
*/

const util = require("util");
const exec = util.promisify(require("child_process").exec);

const buildBackend = async () => {
  await exec("npm run build:server");
};

const buildFrontend = async () => {
  const cwd = "../frontend";
  await exec("npm run build", { cwd });
};

const moveFrontendToBackendDir = async () => {
  await exec("move ../frontend/build ./build");
  await exec('ren "./build/build" "client"');
};

const main = async () => {
  await buildBackend();
  await buildFrontend();
  await moveFrontendToBackendDir();
};

main().catch(e => console.error(e));
