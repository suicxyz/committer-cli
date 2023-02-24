#!/usr/bin/env node

import inquirer from "inquirer";

import { execSync } from "child_process";

import chalk from "chalk";
import commit, { Commit } from "./commit/commit.js";
import questions from "./questions.js";

let modified_files = [],
	deleted_files = [],
	untracked_files = [];

let all_files = [];

const msg = execSync("git status").toString();
var lines = msg.split("\n");

for (let i in lines) {
	lines[i] = lines[i].trim().replace("\t", "");
	let current_line = lines[i].split(":");

	if (lines[i].includes("nothing to commit")) {
		console.log(chalk.blueBright("You have no files to commit!"));
	}

	if (lines[i].includes("modified"))
		modified_files.push(current_line[1].trim());
	if (lines[i].includes("deleted")) deleted_files.push(current_line[1].trim());
	if (lines[i] == "Untracked files:")
		untracked_files.push(lines[parseInt(i) + 2].trim());
}

for (let i of modified_files) all_files.push("Modified:\t" + i);
for (let i of deleted_files) all_files.push("Deleted:\t" + i);
for (let i of untracked_files) all_files.push("Untracked:\t" + i);

console.log(
	chalk.bold("Committer CLI") + " - A cool CLI for cool commits on GitHub"
);

console.log("\nThe following files are not commited:");
all_files.map((i) => {
	if (i.startsWith("Modified")) console.log(chalk.yellow(i));
	if (i.startsWith("Deleted")) console.log(chalk.red(i));
	if (i.startsWith("Untracked")) console.log(chalk.blueBright(i));
});
console.log("");

for (let i in all_files) all_files[i] = all_files[i].split("\t")[1];

async function committer() {
	const answers = await inquirer.prompt(questions(all_files));
	const {
		files,
		commitRN,
		commitKeyword,
		commitType,
		commitMessage,
		description,
		useDefaultBranch,
		useBranch,
	} = answers;

	let filesToCommit = "";
	for (let i of files) filesToCommit += i + " ";

	var commitOptions: Commit = {
		files: filesToCommit,
		message: commitMessage,
		commitType: commitType,
		keyword: commitKeyword,
		description: description != undefined ? description : "",
		defaultBranch: useDefaultBranch,
		branch: useDefaultBranch === true ? undefined : useBranch,
	};

	const commitFeedback = commit(commitOptions);
	console.log(commitFeedback);
}

committer();
