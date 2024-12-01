import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    // Execute commands one by one
    // await exec.exec("npm ci");
    // await exec.exec("npm run build");
    // await exec.exec("npm run lint");
    // await exec.exec("npm run tsc:check");
    // await exec.exec("npm run test");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred.");
    }
  }
}

run();
