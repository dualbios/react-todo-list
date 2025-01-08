import { configureStore } from '@reduxjs/toolkit'
import itemsCountReducer from "./itemsCountSlice.jsx";
import historyReducer from "./historySlice.jsx";
import mainDataReducer from "./mainDataSlice.jsx";

export default configureStore({
    reducer: {
        itemCounterReducer: itemsCountReducer,
        historyReducer: historyReducer,
        mainDataReducer: mainDataReducer
    }
})