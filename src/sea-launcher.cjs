#!/usr/bin/env node

const path = require("node:path");
const { access } = require("node:fs/promises");
const { pathToFileURL } = require("node:url");

async function main() {
  const executableRoot = process.env.SERVICE_LASSO_APP_PACKAGER_SEA_EXECUTABLE_ROOT ?? path.dirname(process.execPath);
  const runtimeRoot = process.env.SERVICE_LASSO_APP_PACKAGER_SEA_PAYLOAD_ROOT ?? executableRoot;
  const entrypoint = path.join(runtimeRoot, "src", "index.js");

  await access(entrypoint);

  process.chdir(runtimeRoot);
  await import(pathToFileURL(entrypoint).href);
}

main().catch((error) => {
  console.error("[app-packager-sea] SEA launcher failed");
  console.error(error?.stack ?? error);
  process.exit(1);
});
