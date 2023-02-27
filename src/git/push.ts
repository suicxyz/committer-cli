import { execSync } from "child_process";

export const pushCommits = (
	useDefaultBranch: boolean,
	customBranch?: string
): { status: "ERR" | "SUCCESS"; msg: string } => {
	if (useDefaultBranch === false && !customBranch)
		return { status: "ERR", msg: "Could not push" };

	if (useDefaultBranch) {
		const stdout = execSync("git push").toString();
		console.log(stdout);
	}

	if (customBranch) {
		const stdout = execSync(`git push -u origin ${customBranch}`).toString();
		console.log(stdout);
	}

	return { status: "SUCCESS", msg: "dunno" };
};
