import chalk from "chalk";
import COMMITS_KEYWORDS from "../misc/keywords.js";
import COMMITS_TYPES from "../misc/types.js";

export const getQuestions = (
	files: Array<string>,
	branches: { defaultBranch: string; allBranches: string[] }
): Array<any> => [
	{
		type: "checkbox",
		name: "files",
		message: "Which file does you want to commit?",
		choices: files,
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
		name: "useDefaultBranch",
		message: `Do you want to use the default branch? ${chalk.dim(
			`[${branches.defaultBranch}]`
		)}`,
		default: true,
	},
	{
		type: "list",
		name: "useBranch",
		message: "Which branch do you want to use?",
		choices: branches.allBranches,
		when: (answers: any): Boolean => answers.useDefaultBranch === false,
	},
];
