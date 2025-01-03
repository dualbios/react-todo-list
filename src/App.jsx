import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ToDoItem from "./Components/ToDoItem/todoitem.jsx";
// import { Modal } from "flowbite-react";
import './App.css'

import data from "./items.json"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {getUID} from "bootstrap/js/src/util/index.js";

function App() {
    const [items, setItems] = useState(data.items)
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [newItemText, setNewItemText] = useState("")
    const [deleteItemId, setDeleteItemId] = useState(null)
    const [deleteItemText, setDeleteItemText] = useState(null)

    const onAddModalHandler = () => {
        setIsAddModalVisible(true)
    }
    const onAddModalCloseHandle = () => {
        setIsAddModalVisible(false)
    }

    const onAddModalSaveHandle = (x) => {
        setIsAddModalVisible(false);
        setItems([...items, {id: getUID(), text: newItemText, isCompleted: false}])
    }
    
    const onDeleteModalCloseHandle = () => {
        setIsDeleteModalVisible(false)
        setIsDeleteModalVisible(null)
    }

    const onDeleteModalDeleteHandle = () => {
        setItems(items.filter(item => item.id !== deleteItemId));
        
        setIsDeleteModalVisible(false)
        setIsDeleteModalVisible(null)
        
    }

    const onItemDeleteHandler = (id) => {
        let ccc  = items.filter(item => item.id !== id)[0]
        console.log(ccc);
        setDeleteItemText(ccc.text);
        setDeleteItemId(id);
        setIsDeleteModalVisible(true);
    };

    return (
        <>
            {
                items.map((item) => (<ToDoItem key={item.id} id={item.id} text={item.text} isCompleted={item.isCompleted}
                                               onDeleteHandler={() => {
                                                   onItemDeleteHandler(item.id);
                                                   console.log(item.id);
                                               }}/>))
            }
            <button className="btn btn-success" onClick={onAddModalHandler}>Add new</button>

            <Modal show={isAddModalVisible} onHide={onAddModalCloseHandle}>

                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
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
                    <Button variant="primary" onClick={onAddModalSaveHandle}>
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
        </>
    )
}

export default App
