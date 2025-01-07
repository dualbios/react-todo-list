import {createSlice} from "@reduxjs/toolkit";

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: []
    },
    reducers: {
        add: (state, val) => {
            state.value.push(val.payload)
        },
        clear: state => {
            state.value = []
        }
    }
})

export const {add, clear} = historySlice.actions
export default historySlice.reducer
