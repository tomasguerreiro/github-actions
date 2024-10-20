const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    execSync("npm install", { stdio: "inherite" });

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
