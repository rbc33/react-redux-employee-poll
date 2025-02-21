import { _saveQuestion } from "../utils/api/_DATA";
import { describe, expect, it } from "@jest/globals";

describe("_saveQuestion", () => {
	it("should return a question object", async () => {
		const question = {
			optionOneText: "optionOneText",
			optionTwoText: "optionTwoText",
			author: "author",
		};
		const result = await _saveQuestion(question);
		expect(result).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				timestamp: expect.any(Number),
				author: expect.any(String),
				optionOne: expect.objectContaining({
					votes: expect.any(Array),
					text: expect.any(String),
				}),
				optionTwo: expect.objectContaining({
					votes: expect.any(Array),
					text: expect.any(String),
				}),
			})
		);
	});
	it("should return an error if no question is passed", async () => {
		const question = {};
		await expect(_saveQuestion(question)).rejects.toContain(
			"Please provide optionOneText, optionTwoText, and author"
		);
	});
});
