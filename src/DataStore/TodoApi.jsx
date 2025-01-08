
const ToDoApiBaseURL = 'https://677ea80794bde1c1252cebd3.mockapi.io/todos/todos';

export const getToDoList = async ()=> {
    try {
        const response = await fetch(ToDoApiBaseURL);
        const data = await response.json()
        return data;
    }
    catch (e) {
        console.log(e)
    }
}

export const updateToDoListItem = async (todoList) => {
    try {
        await fetch(ToDoApiBaseURL+'/'+todoList.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoList)
        });
    } catch (e) {
        console.log(e);
    }
};

export const deleteToDoListItem = async (id) => {
    try {
        await fetch(ToDoApiBaseURL+'/'+id, {
            method: 'DELETE'
        });
    } catch (e) {
        console.log(e);
    }
};

export const createToDoListItem = async (todoList) => {
    try {
        await fetch(ToDoApiBaseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoList)
        });
    } catch (e) {
        console.log(e);
    }
};