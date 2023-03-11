declare module "committer-cli" {
	export type PromptAnswer = {
		files: string[];
		commitKeyword: string;
		commitType: string;
		commitMessage: string;
		addLongDescription: boolean;
		description?: string;
		useDefaultBranch?: boolean;
		useBranch?: string;
	};

	export type GHUser = {
		name: string;
		email: string;
	};
}

