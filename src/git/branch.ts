import { execSync } from "child_process";

export const getBranches = () => {
	const stdout = execSync("git branch -a").toString().split("\n");
	stdout.pop();

	var allBranches = stdout.map((line) => {
		return line.trim().startsWith("*")
			? line.trim()
			: line.trim().split("/").pop();
	});

	var defaultBranch = "";

	for (let i of allBranches) {
		if (i.startsWith("*")) defaultBranch = i.replace("*", "").trim();
		i.trim();
	}

	return { defaultBranch, allBranches };
};
