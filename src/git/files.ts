import chalk from "chalk";

import { getStatus } from "./status.js";

export const getFiles = (prompt_list: boolean = false) => {
	var modifiedFiles: Array<string> = [];
	var untrackedFiles: Array<string> = [];
	var deletedFiles: Array<string> = [];

	const stdout = getStatus();

	if (stdout.startsWith("you have no")) {
		console.log(chalk.cyanBright("You have no files to commit!"));
		process.exit();
	}

	var status = stdout.split("+");

	if (prompt_list) console.log(`The following files are not commited:\n`);

	for (let i in status) {
		const curLine = status[i];
		const curLineFiles = curLine.split(":")[1].split("|");
		curLineFiles.pop();

		if (curLine.startsWith("modified:")) modifiedFiles = curLineFiles;
		if (curLine.startsWith("untracked:")) untrackedFiles = curLineFiles;
		if (curLine.startsWith("deleted:")) deletedFiles = curLineFiles;
	}

	return { modifiedFiles, untrackedFiles, deletedFiles };
};
