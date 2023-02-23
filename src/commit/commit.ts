import { execSync } from "child_process";

import getEmoji from "./get-emoji";
import chalk from "chalk";

export type Commit = {
	files: string;
	message: string;
	commitType: string;
	keyword: string;
	description?: string;
	defaultBranch: boolean;
	branch?: string;
};

export default (params: Commit): string => {
	execSync(`git add ${params.files}`);
	const emoji = getEmoji(params.keyword, params.commitType);
	const hasDescription =
		params.description === undefined ? "" : ` -m "${params.description}"`;

	execSync(
		`git commit -m "${emoji} ${params.keyword}: ${params.message}"${hasDescription}`
	);

	if (params.defaultBranch) {
		execSync("git push");

		return "Changes commited to default branch.";
	} else if (!params.defaultBranch && !params.branch) {
		return "No branch selected to commit changes.";
	} else if (!params.defaultBranch && params.branch) {
		execSync(`git push -u ${params.branch}`);
		return `Changes commited to branch "${params.branch}".`;
	}
};
