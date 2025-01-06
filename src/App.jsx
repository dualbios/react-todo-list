import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ToDoItem from "./Components/ToDoItem/todoitem.jsx";
import './App.css'

import data from "./items.json"
import {createGUID} from "./Components/createGUID.jsx";
import {produce} from "immer";
import TextModal from "./Components/TextModal.jsx";
import EditTextModal from "./Components/EditTextModal.jsx";

function App() {
    const [items, setItems] = useState(data.items)
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

    // Adding handlers
    const onAddModalHandler = () => {
        setIsAddModalVisible(true)
    }
    const onAddModalCloseHandle = () => {
        setIsAddModalVisible(false)
    }

    const onAddModalSaveHandle = () => {
        setIsAddModalVisible(false);
        const newId = createGUID();
        setItems([...items,
            {
                id: newId,
                text: newItemText,
                isCompleted: false
            }])
        setNewItemText("")
    }

    // Delete handlers
    const onDeleteModalCloseHandle = () => {
        setIsDeleteModalVisible(false)
    }

    const onDeleteModalDeleteHandle = () => {
        setItems(items.filter(item => item.id !== deleteItemId));
        setIsDeleteModalVisible(false)
    }

    const onItemDeleteHandler = (id) => {
        let item = items.find(item => item.id === id)
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

    const onEditModalOkHandle = () => {
        setItems(produce(items, draft => {
            const item = draft.find(item => item.id === editItem.Id)
            if (item) {
                item.text = editItem.Text;
            }
        }))
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

    function onCompletedOkHandler() {
        setItems(produce(items, draft => {
            const item = draft.find(item => item.id === completingItemId)
            if (item) {
                item.isCompleted = true
            }
        }))

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
                items.length === 0
                    ? <div className="alert alert-warning">No items</div>
                    : items.map((item) => (<ToDoItem key={item.id}
                                                     id={item.id}
                                                     text={item.text}
                                                     isCompleted={item.isCompleted}
                                                     onDeleteHandler={() => onItemDeleteHandler(item.id)}
                                                     onEditHandler={() => onItemEditHandler(item.id)}
                                                     onCompleteHandler={() => onCompletedHandler(item.id)}/>))
            }
            <div className="d-flex ">
                <button className="btn btn-success ms-auto" onClick={onAddModalHandler}>Add new</button>
            </div>

            <EditTextModal show={isAddModalVisible}
                           onHide={onAddModalCloseHandle}
                           headerMessage={"Adding new..."}
                           message={"Item text"}
                           value={newItemText}
                           onAction={onAddModalSaveHandle}
                           onActionText={"Add"}
                           onActionDisable={!newItemText.trim()}
                           onTextChanged={(e) => setNewItemText(e.target.value)}/>

            <TextModal show={isDeleteModalVisible}
                       onHide={onDeleteModalCloseHandle}
                       message={"Delete '" + deleteItemText + "'?"}
                       onAction={onDeleteModalDeleteHandle}
                       headerMessage={"Deleting..."}
                       onActionText={"Delete"}
            />

            <EditTextModal show={isEditModalVisible}
                           onHide={onEditModalCancelHandle}
                           onActionText={"Save"}
                           onAction={onEditModalOkHandle}
                           headerMessage={"Editing..."}
                           message={"Item text"}
                           value={editItem.Text}
                           onTextChanged={(e) => {
                               const setItem = {Id: editItem.Id, Text: e.target.value}
                               setEditItem(setItem)
                           }}/>

            <TextModal show={isCompletedVisible}
                       onHide={onCompletedCancelHandler}
                       onActionText={"Complete"}
                       onAction={onCompletedOkHandler}
                       headerMessage={"Completing..."}
                       message={"Do you want to complete this item?"}
            />
        </>
    )
}

export default App
