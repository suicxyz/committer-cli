import { execSync } from "child_process";

export const getStatus = (): string => {
	const status = execSync("git status").toString();
	var lines = status.split("\n");
	var modified = "modified:";
	var untracked = "untracked:";
	var deleted = "deleted:";

	for (let i in lines) {
		lines[i] = lines[i].trim().replace("\t", "");
		if (lines[i].includes("nothing to commit"))
			return "You have no files to commit!";

		let curLine = lines[i].split(":");

		if (lines[i].includes("modified")) modified += `${curLine[1].trim()}|`;
		if (lines[i].includes("deleted")) deleted += `${curLine[1].trim()}|`;
		if (lines[i] == "Untracked files:") {
			untracked += `${lines[parseInt(i) + 2].trim()}|`;
		}
	}

	return `${modified}+${untracked}+${deleted}`;
};
