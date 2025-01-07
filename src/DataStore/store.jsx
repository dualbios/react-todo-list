import { configureStore } from '@reduxjs/toolkit'
import itemsCountReducer from "./itemsCountSlice.jsx";
import historyReducer from "./historySlice.jsx";

export default configureStore({
    reducer: {
        itemCounterReducer: itemsCountReducer,
        historyReducer: historyReducer
    }
})