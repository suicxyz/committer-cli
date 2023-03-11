// import { execSync } from "child_process";

import chalk from "chalk";
import { promptAnswers } from "../prompt/answers.js";
import { addFiles } from "./add.js";

import { setCommitMessage } from "./message.js";
// import { pushCommits } from "./push.js";

export const commit = async () => {
	const answers = await promptAnswers();
	const ADDstdout = addFiles(answers.files);
	const { status: commitStatus, stdout: commitStdout } = setCommitMessage(
		answers.commitKeyword,
		answers.commitType,
		answers.commitMessage,
		answers.addLongDescription ? answers.description : undefined
	);

	if (commitStatus == "ERROR") {
		if (commitStdout == "PTWYA") {
			console.log(chalk.redBright("\P\n"))
		}
	}

	// console.log(`ADDstdout: ${ADDstdout}`);
	// console.log(`MSGstdout: ${MSGstdout}`);
};

