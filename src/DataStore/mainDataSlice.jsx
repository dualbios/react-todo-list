import {createSlice} from '@reduxjs/toolkit'

export const mainDataSlice = createSlice({
    name: 'mainData',
    initialState: {
        todoItems: []
    },
    reducers: {
        setTodos: (state, val) => {
            state.todoItems = val.payload.sort(sortIsCompleted)
        },
        addTodo: (state, val) => {
            state.todoItems.push(val.payload)
            state.todoItems = state.todoItems.sort(sortIsCompleted)
        },
        removeTodo: (state, val) => {
            state.todoItems = state.todoItems.filter((todo) => todo.id !== val.payload)
        },
        toggleTodo: (state, val) => {
            const todoItem = state.todoItems.find((todo) => todo.id === val.payload)
            todoItem.isCompleted = true
            state.todoItems = state.todoItems.sort(sortIsCompleted)
        },
        editTodo: (state, val) => {
            const todoItem = state.todoItems.find((todo) => todo.id === val.payload.id)
            todoItem.text = val.payload.text
        }
    }
});

function sortIsCompleted(a, b) {
    return a.isCompleted - b.isCompleted
}

export const {setTodos, addTodo, removeTodo, toggleTodo, editTodo} = mainDataSlice.actions
export default mainDataSlice.reducer

