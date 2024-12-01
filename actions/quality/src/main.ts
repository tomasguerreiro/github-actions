import * as core from "@actions/core";
import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    await exec.exec("npm ci --include=optional");
    await exec.exec("npm run build");
    await exec.exec("npm run lint");
    await exec.exec("npm run tsc:check");
    await exec.exec("npm run test");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred.");
    }
  }
}

run();
