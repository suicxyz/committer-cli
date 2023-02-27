import { execSync } from "child_process";

import inquirer from "inquirer";
import { getQuestions } from "./questions.js";
import { getFiles } from "../git/files.js";
import { getBranches } from "../git/branch.js";
import { PromptAnswer } from "src/@types/committer-cli.js";

export const promptAnswers = (): PromptAnswer => {
	const { modifiedFiles, deletedFiles, untrackedFiles } = getFiles();
	var files: Array<string> = [];

	for (let i of modifiedFiles) files.push(i);
	for (let i of deletedFiles) files.push(i);
	for (let i of untrackedFiles) files.push(i);

	const { defaultBranch, allBranches } = getBranches();

	const questions = getQuestions(files, { defaultBranch, allBranches });

	var answers = undefined;

	inquirer.prompt(questions).then((a) => {
		answers = a;
	});

	return answers;
};
