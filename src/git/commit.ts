import { exec, execSync } from "child_process";

import { promptAnswers } from "../prompt/answers.js";
import { addFiles } from "./add.js";

import { setCommitMessage } from "./message.js";
import { pushCommits } from "./push.js";

export const commit = () => {
	const answers = promptAnswers();

	const ADDstdout = addFiles(answers.files);
	const MSGstdout = setCommitMessage(
		answers.commitKeyword,
		answers.commitType,
		answers.commitMessage,
		answers.addLongDescription ? answers.description : undefined
	);
	
	console.log(ADDstdout);
	console.log(MSGstdout);
};

