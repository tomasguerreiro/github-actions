import * as core from "@actions/core";
import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    // Validações iniciais
    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;
    const vercelOrgId = process.env.VERCEL_ORG_ID;
    const vercelPath = process.env.VERCEL_PATH || ".";

    if (!vercelToken) throw new Error("VERCEL_TOKEN is not defined");
    if (!vercelProjectId) throw new Error("VERCEL_PROJECT_ID is not defined");
    if (!vercelOrgId) throw new Error("VERCEL_ORG_ID is not defined");

    // Instala o CLI do Vercel
    core.info("Installing Vercel CLI...");
    await exec.exec("npm install -g vercel");

    // Instala dependências do projeto
    core.info("Installing project dependencies...");
    await exec.exec("npm ci");

    // Configurações globais do Git
    core.info("Setting Git global configurations...");
    await exec.exec("git config --global user.name 'GitHub Actions'");
    await exec.exec("git config --global user.email 'actions@github.com'");

    // Linka o projeto ao Vercel
    core.info("Linking the project to Vercel...");
    try {
      core.info("Checking if project exists...");
      await exec.exec(
        `vercel project add ${vercelProjectId} --token ${vercelToken}`
      );
      core.info("Project created successfully.");
    } catch (error) {
      core.warning(
        "Failed to create the project. It may already exist or there was an issue."
      );
    }

    // Comando base do Vercel
    const vercelCommand = `vercel --token ${vercelToken} --scope ${vercelOrgId} --yes --cwd ${vercelPath}`;

    const tag = process.env.GITHUB_REF;

    if (tag) {
      if (tag.match(/^refs\/tags\/v\d+\.\d+\.\d+$/)) {
        await exec.exec(`${vercelCommand} --prod`);
        core.info("Deploying to Vercel production...");
      } else if (tag.match(/^refs\/tags\/v\d+\.\d+\.\d+-alpha\.\d+$/)) {
        await exec.exec(`${vercelCommand}`);
        core.info("Deploying to Vercel preview...");
      } else {
        await exec.exec(vercelCommand);
        core.warning(
          "Tag does not match production or alpha patterns. Skipping deploy."
        );
      }
    } else {
      throw new Error("GITHUB_REF is not defined");
    }

    core.info("Vercel deploy completed.");
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
