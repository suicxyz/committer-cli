import getEmoji from "./get-emoji";
import chalk from "chalk";

type Commit = {
	files: string[];
	message: string;
	description?: string;
	defaultBranch: boolean;
	branch?: string;
};

export default (params: Commit): string => {
	return "";
};
