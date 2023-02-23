import { execSync } from "child_process";

import COMMITS_KEYWORDS from "./commit/keywords";
import COMMITS_TYPES from "./commit/types";

let rawBranches = execSync("git branch -a").toString().split("\n");
rawBranches.pop();

let branches = [];
for (let b in rawBranches) branches.push(rawBranches[b].trim());

let defaultBranch = "";
for (let bs in branches)
	if (branches[bs].startsWith("*"))
		defaultBranch = branches[bs].replace("*", "").trim();

export default (all_files) => [
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
		name: "addLongDescription",
		message: "Do you want to add a more detailed description?",
		default: false,
	},
	{
		type: "input",
		name: "description",
		message: "Write your commit description:",
		when: (answers: any): Boolean => answers.addLongDescription === true,
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
