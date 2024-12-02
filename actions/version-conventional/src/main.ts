import * as core from "@actions/core";
import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    // Configura o token de acesso do GitHub
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      throw new Error("GITHUB_TOKEN is not defined");
    } else {
      core.info("GITHUB_TOKEN is defined");
      core.setSecret(githubToken);
    }

    await exec.exec("npm ci");

    // Configura o usuário e o e-mail do Git
    await exec.exec("git config --global user.name 'GitHub Actions'");
    await exec.exec("git config --global user.email 'actions@github.com'");

    if (process.env.GITHUB_REF === "refs/heads/develop") {
      await exec.exec(
        "npx lerna version --no-changelog --force-publish --force-git-tag --preid=alpha --conventional-commits --conventional-prerelease --yes --loglevel verbose"
      );
      core.info("Versioning all packages with prerelease alpha.");
    } else if (process.env.GITHUB_REF === "refs/heads/main") {
      await exec.exec(
        "npx lerna version --force-publish --force-git-tag --conventional-commits --conventional-graduate --yes --loglevel verbose"
      );

      // Gera o changelog
      await exec.exec("npx lerna-changelog");

      core.info("Versioning all package with graduated version.");
    } else {
      core.info("Skipping versioning.");
    }

    core.info("Lerna versioning completed.");

    // equaliza a main com a develop
    if (process.env.GITHUB_REF === "refs/heads/main") {
      core.info("Main branch synchronized with develop.");

      await exec.exec("git checkout develop");
      await exec.exec("git merge main --strategy-option=ours");
      await exec.exec("git push origin develop");
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred.");
    }
  } finally {
    core.info("Action completed.");
  }
}

run();
