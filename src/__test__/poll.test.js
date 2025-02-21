/* eslint-disable no-undef */
import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import Poll from "../Components/poll";

// Mock the router hooks
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({ id: "test123" }),
	useNavigate: () => jest.fn(),
	useLocation: () => jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe("Poll Component", () => {
	let store;

	const mockQuestion = {
		test123: {
			id: "test123",
			author: "user1",
			optionOne: { text: "Option 1", votes: [] },
			optionTwo: { text: "Option 2", votes: [] },
		},
	};

	const mockUsers = {
		user1: {
			id: "user1",
			name: "User One",
			avatarURL: "avatar.jpg",
			answers: {},
		},
	};

	it("shows 'Question not found' for invalid poll id", () => {
		// Mock router with invalid ID
		jest
			.spyOn(require("react-router-dom"), "useParams")
			.mockReturnValue({ id: "invalid123" });

		store = mockStore({
			questions: mockQuestion,
			users: mockUsers,
			authedUser: "user1",
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Poll />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText("Question not found")).toBeInTheDocument();
	});

	it("displays poll content for valid poll id", () => {
		// Mock router with valid ID
		jest
			.spyOn(require("react-router-dom"), "useParams")
			.mockReturnValue({ id: "test123" });

		store = mockStore({
			questions: mockQuestion,
			users: mockUsers,
			authedUser: "user1",
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Poll />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText("Poll by User One")).toBeInTheDocument();
		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});
});
