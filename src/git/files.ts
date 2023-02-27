import { exit } from "process";
import { getStatus } from "./status.js";

export const getFiles = (): any => {
	var modifiedFiles: Array<string> = [];
	var deletedFiles: Array<string> = [];
	var untrackedFiles: Array<string> = [];

	const status = getStatus().split("+");

	for (let i in status) {
		const curLine = status[i];
		const curLineFiles = curLine.split(":")[1].split("|");
		curLineFiles.pop();

		if (curLine.startsWith("modified:")) modifiedFiles = curLineFiles;
		if (curLine.startsWith("deleted:")) deletedFiles = curLineFiles;
		if (curLine.startsWith("untracked:")) untrackedFiles = curLineFiles;
	}

	console.log({ modifiedFiles, deletedFiles, untrackedFiles });
	exit();
	return { modifiedFiles, deletedFiles, untrackedFiles };
};
