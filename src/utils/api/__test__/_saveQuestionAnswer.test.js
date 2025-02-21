import { _saveQuestionAnswer } from "../_DATA.js";
import { describe, expect, it } from "@jest/globals";

describe("_saveQuestion", () => {
	it("should return true", async () => {
		const question = {
			qid: "xj352vofupe1dqz9emx13r",
			authedUser: "tylermcginnis",
			answer: "optionTwo",
		};
		const result = await _saveQuestionAnswer(question);
		expect(result).toEqual(true);
	});
	it("should return an error", async () => {
		const question = {};
		await expect(_saveQuestionAnswer(question)).rejects.toEqual(
			"Please provide authedUser, qid, and answer"
		);
	});
});
