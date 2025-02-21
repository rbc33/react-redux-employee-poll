const logger = (store) => (next) => (action) => {
	console.group(action.type);
	console.log("the action: ", action);

	const returnVal = next(action);

	console.groupEnd();
	return returnVal;
};

export default logger;
