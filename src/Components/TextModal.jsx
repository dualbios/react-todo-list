import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ show, onHide, headerMessage, message, onAction, onActionText }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{headerMessage}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={onAction}>
                    {onActionText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}