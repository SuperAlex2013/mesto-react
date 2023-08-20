import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

export default function AddCardPopup({ handleAddPlaceClick, isLoading, isOpen, onClose }) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
        card_name: '',
        card_src: ''
    });

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) {
            handleAddPlaceClick({
                name: values.card_name,
                link: values.card_src,
            });
        }
    }

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const getClassName = (errorKey, baseClass) => {
        return `${baseClass} ${!errors[errorKey] ? '' : 'form__input-error'}`;
    };

    return (
        <PopupWithForm
            submitTitle={isLoading ? 'Добавляем...' : 'Добавить'}
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <input
                id="image-input"
                className={getClassName('card_name', 'form__input form__input_string_place')}
                type="text"
                value={values.card_name || ''}
                onChange={handleChange}
                name="card_name"
                placeholder="Название"
                maxLength={30}
                minLength={2}
                required
            />
            <span className="form__span-error image-input-error">{errors.card_name}</span>
            <input
                id="src-input"
                className={getClassName('card_src', 'form__input form__input_string_src')}
                value={values.card_src || ''}
                type="url"
                onChange={handleChange}
                name="card_src"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="form__span-error src-input-error">{errors.card_src}</span>
        </PopupWithForm>
    );
}
