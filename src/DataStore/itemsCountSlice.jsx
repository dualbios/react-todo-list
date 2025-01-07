import {createSlice} from '@reduxjs/toolkit'

export const itemsCountSlice = createSlice({
    name: 'itemsCount',
    initialState: {
        value: 0,
        completedCount: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        setState: (state, val) => {
            state.value = val.payload
        },
        decrementCompleted: state => {
            state.completedCount -= 1
        },
        incrementCompleted: state => {
            state.completedCount += 1
        },
        setStateCompleted: (state, val) => {
            state.completedCount = val.payload
        }
    }
})

export const {increment, decrement, setState, incrementCompleted, decrementCompleted, setStateCompleted} = itemsCountSlice.actions
export default itemsCountSlice.reducer