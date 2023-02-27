import chalk from "chalk";

import { getFiles } from "../git/files.js";

export const greetings = () => {
	console.log(
		chalk.bold("Committer CLI") +
			" - A cool CLI for cool commits on GitHub\nThe following files are not commited:"
	);

	const { modifiedFiles, deletedFiles, untrackedFiles } = getFiles();

	for (let i of modifiedFiles) console.log("Modified:", chalk.yellowBright(i));
	for (let i of deletedFiles) console.log("Deleted:", chalk.redBright(i));
	for (let i of untrackedFiles) console.log("Untracked:", chalk.cyanBright(i));

	console.log();
};
