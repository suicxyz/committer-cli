import { execSync } from "child_process";

import chalk from "chalk";
import inquirer from "inquirer";

import { GHUser } from "committer-cli";

export const isConfigSet = async (): Promise<void> => {

};

export const setUserConfig = async (user: GHUser): Promise<void> => {
  
}

export const getUserConfig = async (): Promise<{ name: string, email: string }> => {
  const stdout = execSync(`git config --global --list`).toString()
  const lines = stdout.split("\n");
  lines.pop();

  var emailIsSet: boolean, nameIsSet: boolean;
  var name: string, email: string;

  for (let i of lines) {
    if (i.includes("user.name="))
      nameIsSet = true;
    else
      console.log(chalk.redBright("Your GitHub username is not configured!"));
    if (i.includes("user.email="))
      emailIsSet = true;
    else
      console.log(chalk.redBright("Your GitHub email is not configured!"));
  }

  // if (nameIsSet && emailIsSet) {
  // name = execSync(`git config --global user.name`).toString();
  // email = execSync(`git config --global user.email`).toString();
  // }

  if (!nameIsSet) {
    console.log();
    let stdout = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "What is yout GitHub username?",
      validate: (input: string) => input.length > 0
    });
    console.log(stdout);
  }

  return { name, email };
}