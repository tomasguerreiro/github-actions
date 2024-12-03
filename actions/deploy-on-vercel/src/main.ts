import * as core from "@actions/core";
import * as exec from "@actions/exec";

/**
 * Função principal para execução da action.
 * Faz o deploy de uma aplicação no Vercel.
 */
async function run(): Promise<void> {
  try {
    // Configura o token de acesso do GitHub
    const vercelToken = process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      throw new Error("VERCEL_TOKEN is not defined");
    } else {
      core.info("VERCEL_TOKEN is defined");
    }

    if (!process.env.VERCEL_PROJECT_ID) {
      throw new Error("VERCEL_PROJECT_ID is not defined");
    }

    if (!process.env.VERCEL_ORG_ID) {
      throw new Error("VERCEL_ORG_ID is not defined");
    }

    const vercelPath = process.env.VERCEL_PATH || ".";

    core.info(vercelPath);

    // Instala o CLI da Vercel globalmente
    await exec.exec("npm install -g vercel");

    await exec.exec("npm ci");

    // Configura o usuário e o e-mail do Git
    await exec.exec("git config --global user.name 'GitHub Actions'");
    await exec.exec("git config --global user.email 'actions@github.com'");

    const vercelCommand = `vercel --token ${vercelToken} --yes --cwd ${vercelPath}`;

    const tag = process.env.GITHUB_REF;

    if (tag) {
      if (tag.match(/^refs\/tags\/v\d+\.\d+\.\d+$/)) {
        await exec.exec(`${vercelCommand} --prod`);
        core.info("Deploying to Vercel production...");
      } else if (tag.match(/^refs\/tags\/v\d+\.\d+\.\d+-alpha\.\d+$/)) {
        await exec.exec(`${vercelCommand} --cwd`);
        core.info("Deploying to Vercel preview...");
      } else {
        await exec.exec(vercelCommand);
      }
    } else {
      // throw new Error("GITHUB_REF is not defined");
      core.info("No tag found. Not deploying to Vercel.");
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
