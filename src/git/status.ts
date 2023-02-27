import { execSync } from "child_process";

export const getStatus = (): string => {
	const status = execSync("git status").toString();
	var lines = status.split("\n");
	var modified = "modified:";
	var untracked = "untracked:";
	var deleted = "deleted:";

	for (let i in lines) {
		const curIndex = parseInt(i);

		lines[curIndex] = lines[curIndex].trim().replace("\t", "");

		if (lines[curIndex].includes("nothing to commit"))
			return "You have no files to commit!";

		let curLine = lines[curIndex].split(":");

		if (lines[curIndex].includes("modified"))
			modified += `${curLine[1].trim()}|`;
		if (lines[curIndex].includes("deleted")) deleted += `${curLine[1].trim()}|`;
		if (lines[curIndex] == "Untracked files:") {
			const start = curIndex + 2;
			for (let j = start; j < lines.length; j++) {
				if (lines[j] == "") break;
				untracked += `${lines[j].trim()}|`;
			}
		}
	}

	return `${modified}+${untracked}+${deleted}`;
};
