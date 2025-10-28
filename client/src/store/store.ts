import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from './canvas/toolsSlice';
//import canvasReducer from './canvas/canvasSlice'

export const store = configureStore({
    reducer: {
        tools: toolsReducer,
        //canvas: canvasReducer, later
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch