import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import LogIn from "../Components/LogIn";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("Login Component", () => {
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

	beforeEach(() => {
		store = mockStore({
			...initialState,
			authedUser: null,
		});
	});

	it("renders login component correctly", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<LogIn />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByTestId("login-component")).toBeInTheDocument();
	});

	it("allows user selection", () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<LogIn />
				</BrowserRouter>
			</Provider>
		);

		const selectElement = screen.getByRole('combobox');
		fireEvent.change(selectElement, { target: { value: 'testuser' } });
		
		expect(selectElement.value).toBe('testuser');
	});
});
