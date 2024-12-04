import * as core from "@actions/core";
import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    // Validações iniciais
    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;
    const vercelOrgId = process.env.VERCEL_ORG_ID;
    const vercelPath = process.env.VERCEL_PATH || ".";
    const githubRef = process.env.GITHUB_REF;
    const githubEventPath = process.env.GITHUB_EVENT_PATH;

    if (!vercelToken) throw new Error("VERCEL_TOKEN is not defined");
    if (!vercelProjectId) throw new Error("VERCEL_PROJECT_ID is not defined");
    if (!vercelOrgId) throw new Error("VERCEL_ORG_ID is not defined");
    if (!githubRef) throw new Error("GITHUB_REF is not defined");
    if (!githubEventPath) throw new Error("GITHUB_EVENT_PATH is not defined");

    // Carregar o evento JSON gerado pelo workflow_run
    const event = require(githubEventPath);
    const branchName = event.workflow_run?.head_branch;

    if (!branchName) {
      throw new Error(
        "Branch name could not be determined from workflow_run event."
      );
    }

    core.info(`Detected branch: ${branchName}`);

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
    const vercelCommand = `vercel --token ${vercelToken} --scope ${vercelOrgId} --cwd ${vercelPath} --yes`;

    // Identificação e deploy com base na tag
    core.info("Processing GitHub reference...");

    if (branchName === "develop") {
      core.info("Deploying to Vercel preview...");
      await exec.exec(`${vercelCommand}`);
    } else if (branchName === "main") {
      core.info("Deploying to Vercel production...");
      await exec.exec(`${vercelCommand} --prod`);
    } else {
      throw new Error("Skipping deploy.");
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
