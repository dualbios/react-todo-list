import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

export default function ModalForm({show, onHide, headerMessage, onAction, onActionText, onActionDisable,  children}) {
    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{headerMessage}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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