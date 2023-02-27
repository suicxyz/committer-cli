export default [
	{ value: "init", name: "init:\t\tFirst commit", short: "init" },
	{ value: "feat", name: "feat:\t\tA new feature", short: "feat" },
	{ value: "fix", name: "fix:\t\tA bug fix", short: "fix" },
	{ value: "docs", name: "docs:\t\tDocumentation changes", short: "docs" },
	{ value: "test", name: "test:\t\tAdding missing tests", short: "test" },
	{
		value: "build",
		name: "build:\tChanges that affect the build system or external dependencies\n\t\t(gulp, broccoli, npm)",
		short: "build",
	},
	{
		value: "perf",
		name: "perf:\t\tA code change that improves performance",
		short: "perf",
	},
	{
		value: "style",
		name: "style:\tChanges that do not affect the meaning of the code\n\t\t(white-space, fomratting, missing semi-colons, etc)",
		short: "style",
	},
	{
		value: "refactor",
		name: "refactor:\tA code that neither fixes a bug or adds a feature",
		short: "refactor",
	},
	{
		value: "chore",
		name: "chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation",
		short: "chore",
	},
	{
		value: "ci",
		name: "ci:\t\tChanges to our CI configuration files and scripts\n\t\t(CircleCi, SauceLabs)",
		short: "ci",
	},
	{ value: "other", name: "other:\tAny other thing", short: "other" },
];
