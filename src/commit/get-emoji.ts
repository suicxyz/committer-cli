const emojis = [
	"other+accessibility=:wheelchair:",
	"test+adding a test=:white_check_mark:",
	"build+adding a dependency=:heavy_plus_sign:",
	"+code review changes=:ok_hand:",
	"other+animations and transitions=:dizzy:",
	"fix+bugfix=:bug:",
	"docs+comments=:bulb:",
	"init+initial commit=:tada:",
	"chore+configuration=:wrench:",
	"other+deploy=:rocket:",
	"docs+documentation=:books:",
	"other+in progress=:construction:",
	"feat+interface styling=:lipstick:",
	"ci+infrastructure=:bricks:",
	"other+tasks=:soon:",
	"chore+move/rename=:truck:",
	"feat+new feature=:sparkles:",
	"build+package.json=:package:",
	"perf+performance=:zap:",
	"refactor+refactoring=:recycle:",
	"other+deleting a file=:fire:",
	"build+removing a dependency=:heav_minus_sign:",
	"other+responsivity=:iphone:",
	"fix+reverting changes=:boom:",
	"other+security=:lock:",
	"other+SEO=:mag:",
	"other+version tag=:bookmark:",
	"test+passing test=:heavy_check_mark:",
	"test+tests=:test_tube:",
	"other+text=:pencil:",
	"other+typing=:label:",
	"other+error handling=:goal_net:",
];

export default function (keyword: string, type: string): string {
	let emoji = "";

	for (let i of emojis) {
		if (i.split("+")[0] == keyword) {
			if (i.split("+")[1].split("=")[0] == type) {
				emoji = i.split("=")[1];
			}
		}
	}

	return emoji;
}
