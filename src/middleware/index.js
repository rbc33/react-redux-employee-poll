import logger from "./logger";
import { thunk } from "redux-thunk";

const middleware = [thunk, logger];
export default middleware;
