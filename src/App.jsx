import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ToDoItem from "./Components/ToDoItem/todoitem.jsx";
import './App.css'

import data from "./items.json"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {createGUID} from "./Components/createGUID.jsx";
import {produce} from "immer";

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
    const [isCompletedVisible, setisCompletedVisible] = useState(false)

    const onAddModalHandler = () => {
        setIsAddModalVisible(true)
    }
    const onAddModalCloseHandle = () => {
        setIsAddModalVisible(false)
    }

    const onAddModalSaveHandle = (x) => {
        setIsAddModalVisible(false);
        const newId = createGUID();
        setItems([...items,
            {
                id: newId,
                text: newItemText,
                isCompleted: false
            }])
    }

    const onDeleteModalCloseHandle = () => {
        setIsDeleteModalVisible(false)
    }

    const onDeleteModalDeleteHandle = () => {
        setItems(items.filter(item => item.id !== deleteItemId));
        setIsDeleteModalVisible(false)
    }

    const onItemDeleteHandler = (id) => {
        let ccc = items.find(item => item.id === id)
        setDeleteItemText(ccc.text);
        setDeleteItemId(id);
        setIsDeleteModalVisible(true);
    };

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

    const onCompletedHandler = (id) => {
        setCompletingItemId(id)
        setisCompletedVisible(true)
    }

    function onCompletedOkHandler() {
        setItems(produce(items, draft => {
            const item = draft.find(item => item.id === completingItemId)
            if (item) {
                item.isCompleted = true
            }
        }))

        setCompletingItemId(null)
        setisCompletedVisible(false)
    }

    function onCompletedCancelHandler() {
        setCompletingItemId(null)
        setisCompletedVisible(false)
    }

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

            <Modal show={isAddModalVisible} onHide={onAddModalCloseHandle}>

                <Modal.Header closeButton>
                    <Modal.Title>Adding new...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label column="c1">Item text</Form.Label>
                            <Form.Control type="text" placeholder="Enter item text"
                                          onChange={(e) => setNewItemText(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onAddModalCloseHandle}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onAddModalSaveHandle} disabled={!newItemText.trim()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isDeleteModalVisible} onHide={onDeleteModalCloseHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>deleting...</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete Item '{deleteItemText}'</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onDeleteModalCloseHandle}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onDeleteModalDeleteHandle}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isEditModalVisible} onHide={onEditModalCancelHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onEditModalCancelHandle}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onEditModalOkHandle}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isCompletedVisible} onHide={onCompletedCancelHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Completing...</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to complete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCompletedCancelHandler}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={onCompletedOkHandler}>
                        Complete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default App
