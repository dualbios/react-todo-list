import {createSlice} from '@reduxjs/toolkit'

export const mainDataSlice = createSlice({
    name: 'mainData',
    initialState: {
        todoItems: []
    },
    reducers: {
        setTodos: (state, val) => {
            state.todoItems = val.payload
        },
        addTodo: (state, val) => {
            state.todoItems.push(val.payload)
        },
        removeTodo: (state, val) => {
            state.todoItems = state.todoItems.filter((todo) => todo.id !== val.payload)
        },
        toggleTodo: (state, val) => {
            const todoItem = state.todoItems.find((todo) => todo.id === val.payload)
            todoItem.isCompleted = true
        },
        editTodo: (state, val) => {
            const todoItem = state.todoItems.find((todo) => todo.id === val.payload.id)
            todoItem.text = val.payload.text
        }
    }
});

export const {setTodos, addTodo, removeTodo, toggleTodo, editTodo} = mainDataSlice.actions
export default mainDataSlice.reducer

