import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";

export default function ModalForm({show, onHide, headerMessage, message, value, onAction, onActionText, onActionDisable, onTextChanged, children}) {
    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{headerMessage}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<Form>*/}
                {/*    <Form.Group>*/}
                {/*        <Form.Label column="c1">{message}</Form.Label>*/}
                {/*        <Form.Control id="edit-text"*/}
                {/*                      type="text"*/}
                {/*                      placeholder="Enter item text"*/}
                {/*                      value={value}*/}
                {/*                      onChange={onTextChanged}/>*/}
                {/*    </Form.Group>*/}
                {/*</Form>*/}
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction} disabled={onActionDisable}>
                    {onActionText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}