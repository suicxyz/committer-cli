import chalk from "chalk";

import { getFiles } from "../git/files.js";
import { getUserConfig } from "../troubleshooting/user-config.js";

export const greetings = async () => {
	console.log(
		chalk.bold("Committer CLI") +
		" - A cool CLI for cool commits on GitHub\n"
	);

	await getUserConfig();

	const { modifiedFiles, deletedFiles, untrackedFiles } = getFiles(true);

	for (let i of modifiedFiles)
		console.log(
			chalk.yellowBright(
				`${chalk.bold("Modified")
				}: ${i}`
			)
		);
	for (let i of deletedFiles)
		console.log(
			chalk.redBright(
				`${chalk.bold("Deleted")
				}: ${i}`
			)
		);
	for (let i of untrackedFiles)
		console.log(
			chalk.cyanBright(
				`${chalk.bold("Untracked")
				}: ${i}`
			)
		);

	console.log();
};
