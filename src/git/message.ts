import { execSync } from "child_process";

import getEmoji from "../misc/get-emoji.js";

export const setCommitMessage = (
	keyword: string,
	type: string,
	message: string,
	description: string
): string => {
	const emoji = getEmoji(keyword, type);
	const hasDescription =
		description === undefined ? "" : ` -m "${description}"`;

	const stdout = execSync(
		`git commit -m "${emoji} ${keyword}: ${message}"${hasDescription}`
	).toString();

	return stdout;
};
