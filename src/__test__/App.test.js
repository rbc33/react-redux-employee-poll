import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { thunk } from "redux-thunk"; // Updated import

// Mock the shared actions
jest.mock("../actions/shared", () => ({
	handleInitialData: () => ({ type: "HANDLE_INITIAL_DATA" }),
}));

const mockStore = configureStore([thunk]); // Middleware properly configured

describe("App Component", () => {
	let store;

	const initialState = {
		users: {
			testuser: {
				id: "testuser",
				name: "Test User",
				answers: {},
				questions: [],
			},
		},
		questions: {},
		loadingBar: { default: 0 },
	};

	describe("when user is not authenticated", () => {
		beforeEach(() => {
			store = mockStore({
				...initialState,
				authedUser: null,
			});
		});

		it("should show login page", () => {
			render(
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			);

			expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
			expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
			expect(screen.getByTestId("login-component")).toBeInTheDocument();
		});
	});

	describe("when user is authenticated", () => {
		beforeEach(() => {
			store = mockStore({
				...initialState,
				authedUser: "testuser",
			});
		});

		it("should show dashboard and navigation", () => {
			render(
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
			expect(screen.queryByTestId("login-component")).not.toBeInTheDocument();
		});
	});
});
