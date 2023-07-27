import { applyMiddleware, configureStore, compose } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

const enhancers = compose(applyMiddleware(logger))

export const store = configureStore({
    reducer: rootReducer,
})

