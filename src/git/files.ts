import { getStatus } from "./status.js";

export const getFiles = () => {
	var modifiedFiles: Array<string> = [];
	var untrackedFiles: Array<string> = [];
	var deletedFiles: Array<string> = [];

	const status = getStatus().split("+");

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
