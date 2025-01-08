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
            let array = state.todoItems
            array.push(val.payload)
            state.todoItems = array.sort(sortIsCompleted)
        },
        removeTodo: (state, val) => {
            state.todoItems = state.todoItems.filter((todo) => todo.id !== val.payload)
        },
        toggleTodo: (state, val) => {
            let array = state.todoItems
            const todoItem = array.find((todo) => todo.id === val.payload)
            todoItem.isCompleted = true
            
            state.todoItems = array.sort(sortIsCompleted)
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

