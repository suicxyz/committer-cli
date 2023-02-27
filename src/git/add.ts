import { execSync } from "child_process";

export const addFiles = (files: string[]): string => {
	var filesToAdd: string = "";

	for (let i of files) filesToAdd += `${i} `;

	const stdout = execSync(`git add ${filesToAdd}`).toString();

	return stdout;
};
