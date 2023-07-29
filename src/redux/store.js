import { applyMiddleware, configureStore, compose } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import thunk from 'redux-thunk'

const enhancers = compose(applyMiddleware(logger))

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

