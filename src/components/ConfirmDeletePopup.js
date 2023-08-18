import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ submitTitle, isOpen, onClose, onConfirm }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm
            submitTitle={submitTitle}
            name="del-card"
            title="Вы уверены?"
            class="true"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    );
}

export default ConfirmDeletePopup;
