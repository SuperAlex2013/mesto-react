import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isLoading, onConfirm, isOpen, onClose }) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onConfirm();
    }

    const submitTitle = isLoading ? 'Сохраняем...' : 'Да';

    return (
        <PopupWithForm
            submitTitle={submitTitle}
            name="del-card"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={true}
        />
    );
}

export default ConfirmDeletePopup;
