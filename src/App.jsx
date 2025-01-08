import React, {useEffect} from "react";
import {useState} from "react";
import {produce} from "immer";
import 'bootstrap/dist/css/bootstrap.css';

import {createGUID} from "./Components/createGUID.jsx";

import './App.css'
import ToDoItem from "./Components/ToDoItem/todoitem.jsx";

import {useSelector, useDispatch} from 'react-redux'
import {
    increment,
    decrement,
    setState,
    incrementCompleted,
    decrementCompleted,
    setStateCompleted
} from "./DataStore/itemsCountSlice.jsx"
import {add, clear} from "./DataStore/historySlice.jsx"
import {addTodo, editTodo, toggleTodo, removeTodo, setTodos} from "./DataStore/mainDataSlice.jsx"

import ModalForm from "./Modals/ModalForm.jsx";
import {Form} from "react-bootstrap";
import * as todoListApi from "./DataStore/TodoApi.jsx";

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [newItemText, setNewItemText] = useState("")
    const [deleteItemId, setDeleteItemId] = useState(null)
    const [deleteItemText, setDeleteItemText] = useState("")
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const initialEditItem = {Id: null, Text: ""}
    const [editItem, setEditItem] = useState(initialEditItem)
    const [completingItemId, setCompletingItemId] = useState(null)
    const [isCompletedVisible, setIsCompletedVisible] = useState(false)

    const items = useSelector(state => state.mainDataReducer.todoItems)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)

        async function fetchData() {
            const response = await todoListApi.getToDoList()

            if (response !== undefined) {
                dispatch(setTodos(response))
                dispatch(setState(response.length))
                dispatch(setStateCompleted(response.filter(x => x.isCompleted).length))
            }
        }

        fetchData()
            .catch(e => console.log(e))
            .finally(() => {
                dispatch(add({type: "loaded", id: null, text: null}))
                setIsLoading(false)
            });
    }, [])

    // Adding handlers
    const onAddModalHandler = () => {
        setIsAddModalVisible(true)
    }
    const onAddModalCloseHandle = () => {
        setNewItemText("")
        setIsAddModalVisible(false)
    }

    const onAddModalSaveHandle = async () => {
        setIsAddModalVisible(false);
        const newId = createGUID();

        dispatch(addTodo({id: newId, text: newItemText, isCompleted: false}));
        setNewItemText("")
        dispatch(increment())
        dispatch(add({type: "add", id: newId, text: newItemText}))
        await todoListApi.createToDoListItem({id: newId, text: newItemText, isCompleted: false})
    }

    // Delete handlers
    const onDeleteModalCloseHandle = () => {
        setIsDeleteModalVisible(false)
    }

    const onDeleteModalDeleteHandle = async () => {
        dispatch(add({type: "delete", id: deleteItemId, text: deleteItemText}))
        setIsDeleteModalVisible(false)
        dispatch(decrement())
        dispatch(removeTodo(deleteItemId))
        await todoListApi.deleteToDoListItem(deleteItemId)
    }

    const onItemDeleteHandler = (id) => {
        let item = items.find(item => item.id === id)
        dispatch(add({type: "delete", id: item.id, text: item.text}))

        setDeleteItemText(item.text);
        setDeleteItemId(id);
        setIsDeleteModalVisible(true);
    };

    // Edit handlers
    const onItemEditHandler = (id) => {
        const item = items.find(item => item.id === id);

        setEditItem({Id: item.id, Text: item.text})
        setIsEditModalVisible(true)
    }

    const onEditModalOkHandle = async () => {
        dispatch(editTodo({id: editItem.Id, text: editItem.Text}))
        dispatch(add({type: "edit", id: editItem.Id, text: editItem.Text}))
        await todoListApi.updateToDoListItem({id: editItem.Id, text: editItem.Text})
        setEditItem(initialEditItem)
        setIsEditModalVisible(false)

    }

    const onEditModalCancelHandle = () => {
        setIsEditModalVisible(false)
    }

    // Complete handlers
    const onCompletedHandler = (id) => {
        setCompletingItemId(id)
        setIsCompletedVisible(true)
    }

    const onCompletedOkHandler = async () => {
        dispatch(add({
            type: "complete",
            id: completingItemId,
            text: items.find(x => x.id === completingItemId).text
        }))
        dispatch(toggleTodo(completingItemId))
        await todoListApi.updateToDoListItem({id: completingItemId, isCompleted: true})

        setCompletingItemId(null)
        setIsCompletedVisible(false)
    }

    function onCompletedCancelHandler() {
        setCompletingItemId(null)
        setIsCompletedVisible(false)
    }

    // Return
    return (
        <>
            {
                isLoading
                    ? <div className="alert alert-info">Loading...</div>
                    : (items.length === 0
                        ? <div className="alert alert-warning">No items</div>
                        : items.map((item) => (<ToDoItem key={item.id}
                                                         id={item.id}
                                                         text={item.text}
                                                         isCompleted={item.isCompleted}
                                                         onDeleteHandler={() => onItemDeleteHandler(item.id)}
                                                         onEditHandler={() => onItemEditHandler(item.id)}
                                                         onCompleteHandler={() => onCompletedHandler(item.id)}/>)))
            }
            <div className="d-flex ">
                <button className="btn btn-success ms-auto" onClick={onAddModalHandler}>Add new</button>
            </div>

            <ModalForm show={isAddModalVisible}
                       onHide={onAddModalCloseHandle}
                       headerMessage={"Adding new..."}
                       onAction={onAddModalSaveHandle}
                       onActionText="Add"
                       onActionDisable={!newItemText.trim()}>
                <Form>
                    <Form.Group>
                        <Form.Label column="c1">Item text</Form.Label>
                        <Form.Control id="edit-text"
                                      type="text"
                                      placeholder="Enter item text"
                                      value={newItemText}
                                      onChange={(e) => setNewItemText(e.target.value)}/>
                    </Form.Group>
                </Form>
            </ModalForm>

            <ModalForm show={isDeleteModalVisible}
                       onHide={onDeleteModalCloseHandle}
                       onAction={onDeleteModalDeleteHandle}
                       headerMessage="Deleting..."
                       onActionText="Delete">
                {"Delete '" + deleteItemText + "'?"}
            </ModalForm>

            <ModalForm show={isEditModalVisible}
                       onHide={onEditModalCancelHandle}
                       onActionText="Save"
                       onAction={onEditModalOkHandle}
                       headerMessage="Editing...">
                <Form>
                    <Form.Group>
                        <Form.Label column="c1">Item text</Form.Label>
                        <Form.Control id="edit-text"
                                      type="text"
                                      placeholder="Enter item text"
                                      value={editItem.Text}
                                      onChange={(e) => {
                                          const setItem = {Id: editItem.Id, Text: e.target.value}
                                          setEditItem(setItem)
                                      }}/>
                    </Form.Group>
                </Form>
            </ModalForm>

            <ModalForm show={isCompletedVisible}
                       onHide={onCompletedCancelHandler}
                       onActionText={"Complete"}
                       onAction={onCompletedOkHandler}
                       headerMessage={"Completing..."}>
                Do you want to complete this item?
            </ModalForm>
        </>
    )
}

export default App
