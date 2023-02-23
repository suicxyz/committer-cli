#!/usr/bin/env node

import inquirer from "inquirer";

import COMMITS_KEYWORDS from "./commit/keywords";
import COMMITS_TYPES from "./commit/types";

import { execSync } from "child_process";

import chalk from "chalk";

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

console.log("Committer CLI - A cool CLI for cool commits on GitHub");

console.log("\nThe following files are not commited:");
all_files.map((i) => {
	if (i.startsWith("Modified")) console.log(chalk.yellow(i));
	if (i.startsWith("Deleted")) console.log(chalk.red(i));
	if (i.startsWith("Untracked")) console.log(chalk.blueBright(i));
});
console.log("");

for (let i in all_files) all_files[i] = all_files[i].split("\t")[1];

async function committer() {
	let rawBranches = execSync("git branch -a").toString().split("\n");
	rawBranches.pop();

	let branches = [];
	for (let b in rawBranches) branches.push(rawBranches[b].trim());

	let defaultBranch = "";
	for (let bs in branches)
		if (branches[bs].startsWith("*"))
			defaultBranch = branches[bs].replace("*", "").trim();

	const questions = [
		{
			type: "checkbox",
			name: "files",
			message: "Which file does you want to commit?",
			choices: all_files,
			validate: (files: string[]): Boolean | string => {
				if (!files.length) return "Please select at least one file to commit.";
				return true;
			},
		},
		{
			type: "list",
			name: "commitKeyword",
			message: "What is keyword that relates to this commit?",
			choices: COMMITS_KEYWORDS,
		},
		{
			type: "list",
			name: "commitType",
			message: "What is the type of this commit?",
			choices: (answers: any): Array<string> => {
				const filteredList = [];
				const selectedType = answers.commitKeyword;

				COMMITS_TYPES.map((type) => {
					if (type.keyword == selectedType) filteredList.push(type);
				});

				return filteredList;
			},
		},
		{
			type: "input",
			name: "commitMessage",
			message: "Write your commit message:",
		},
		{
			type: "confirm",
			name: "addLongDecsription",
			message: "Do you want to add a more detailed description?",
			default: false,
		},
		{
			type: "input",
			name: "description",
			message: "Write your commit description:",
			when: (answers: any): Boolean => answers.addLongDecsription === true,
		},
		{
			type: "confirm",
			name: "commitRN",
			message: "Do you want to push your commits right now?",
			default: true,
		},
		{
			type: "confirm",
			name: "useDefaultBranch",
			message: `Do you want to use the default branch? [${defaultBranch}]`,
			default: true,
		},
		{
			type: "list",
			name: "useBranch",
			message: "Which branch do you want to use?",
			choices: branches,
			when: (answers: any): Boolean => answers.useDefaultBranch === false,
		},
	];

	const answers = await inquirer.prompt(questions);
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

	if (commitRN) {
		// execSync(`git add ${filesToCommit}`);
		// execSync(
		// `git commit -m ":${getEmoji(commitKeyword, commitType)}: ${commitKeyword}: ${
		// commitKeyword == "init" ? "first commit!" : commitMessage
		// }" -m "${description}"}"`
		// );
		// if (useDefaultBranch) execSync(`git push`);
		// else execSync(`git push -u origin ${useBranch.split("/").slice(-1)[0]}`);
		if (useDefaultBranch) console.log(`git push`);
		else
			console.log(
				`git push -u origin ${
					useBranch.includes("*")
						? useBranch.replace("* ", "")
						: useBranch.split("/").slice(-1)[0]
				}`
			);
	}
}

committer();
