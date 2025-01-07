import { configureStore } from '@reduxjs/toolkit'
import itemsCountReducer from "./itemsCountSlice.jsx";

export default configureStore({
    reducer: {
        counter: itemsCountReducer
    }
})