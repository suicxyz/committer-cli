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
	// const stdout = pushCommits(answers.useDefaultBranch, answers.useBranch);

	console.log(ADDstdout);
	console.log(MSGstdout);
};

// export default (params: Commit): string => {
// 	execSync(`git add ${params.files}`);

// 	const hasDescription =
// 		params.description === undefined ? "" : ` -m "${params.description}"`;

// 	execSync(
// 		`git commit -m "${emoji} ${params.keyword}: ${params.message}"${hasDescription}`
// 	);

// 	if (params.defaultBranch) {
// 		execSync("git push");

// 		return "Changes commited to default branch.";
// 	} else if (!params.defaultBranch && !params.branch) {
// 		return "No branch selected to commit changes.";
// 	} else if (!params.defaultBranch && params.branch) {
// 		execSync(`git push -u ${params.branch}`);
// 		return `Changes commited to branch "${params.branch}".`;
// 	}
// };
