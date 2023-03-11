import { commit } from "./git/commit.js";
import { greetings } from "./misc/greetings.js";

export const committer = () => {
	greetings();
	// commit();
};
