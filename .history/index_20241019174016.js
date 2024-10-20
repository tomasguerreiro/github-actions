const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    // Executar os comandos, um por um
    await exec.exec("npm ci");
    await exec.exec("npm run build");
    await exec.exec("npm run lint");
    await exec.exec("tsc --noEmit --pretty");
    await exec.exec("npm run test");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
