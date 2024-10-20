const core = require("@actions/core");
const exec = require("@actions/exec");
const { execSync } = require("child_precess");

async function run() {
  try {
    execSync("npm install", { stdio: "inherit" });

    // Executar os comandos, um por um
    await exec.exec("npm ci");
    await exec.exec("npm run build");
    await exec.exec("npm run lint");
    await exec.exec("npm run tsc:check");
    await exec.exec("npm run test");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
