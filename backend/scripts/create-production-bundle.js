const util = require("util");
const exec = util.promisify(require("child_process").exec);

const buildBackend = async () => {
  // const cwd = "../";
  await exec("npm run build");
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
