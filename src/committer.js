#!/usr/bin/env/ node

import { execSync } from "child_process";

import inquirer from "inquirer";
import chalk from "chalk";

const COMMITS_TYPES = [
	"feat:\t\tA new feature",
	"fix:\t\tA bug fix",
	"docs:\t\tDocumentation changes",
	"test:\t\tAdding missing tests",
	"build:\tChanges that affect the build system or external dependencies\n\t\t(gulp, broccoli, npm)",
	"perf:\t\tA code change that improves performance",
	"style:\tChanges that do not affect the meaning of the code\n\t\t(white-space, fomratting, missing semi-colons, etc)",
	"refactor:\tA code that neither fixes a bug or adds a feature",
	"chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation",
	"ci:\t\tChanges to our CI configuration files and scripts\n\t\t(CircleCi, SauceLabs)",
	"other:\tAny other thing",
];

let modified_files = [],
	deleted_files = [],
	untracked_files = [];

let all_files = [];

const msg = execSync("git status").toString();
var lines = msg.split("\n");

for (let i in lines) {
	lines[i] = lines[i].trim().replace("\t", "");
	let current_line = lines[i].split(":");

	if (lines[i].includes("modified"))
		modified_files.push(current_line[1].trim());
	if (lines[i].includes("deleted")) deleted_files.push(current_line[1].trim());
	if (lines[i] == "Untracked files:")
		untracked_files.push(lines[parseInt(i) + 2].trim());
}

for (let i of modified_files) all_files.push("Modified:\t" + i);
for (let i of deleted_files) all_files.push("Deleted:\t" + i);
for (let i of untracked_files) all_files.push("Untracked:\t" + i);

console.log("*".repeat(process.stdout.columns));
console.log(
	" ".repeat((process.stdout.columns - 11) / 2) +
		" Committer " +
		" ".repeat((process.stdout.columns - 11) / 2)
);
console.log("*".repeat(process.stdout.columns));

console.log("\nThe following files are not commited:");
all_files.map((i) => {
	if (i.startsWith("Modified")) console.log(chalk.yellow(i));
	if (i.startsWith("Deleted")) console.log(chalk.red(i));
	if (i.startsWith("Untracked")) console.log(chalk.blueBright(i));
});
console.log("");

for (let i in all_files) all_files[i] = all_files[i].split("\t")[1];

inquirer
	.prompt([
		{
			type: "checkbox",
			name: "files",
			message: "Which file does you want to commit?",
			choices: all_files,
			validate: (files) => {
				if (!files.length) return "Please select at least one file to commit.";
				return true;
			},
		},
		{
			type: "list",
			name: "commitType",
			message: "Select the commit type",
			choices: COMMITS_TYPES,
		},
		{},
	])
	.then((a) => {
		console.log(a);
	});
