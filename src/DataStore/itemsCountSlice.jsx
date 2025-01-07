import {createSlice} from '@reduxjs/toolkit'

export const itemsCountSlice = createSlice({
    name: 'itemsCount',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        setState: (state, val) => {
            console.log(val)
            state.value = val.payload
        }
    }
})

export const {increment, decrement, setState} = itemsCountSlice.actions

export default itemsCountSlice.reducer