import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

export default function EditAvatarPopup(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
        updInput: ''
    });

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) {
            props.onUpdateAvatar({
                avatar: values.updInput,
            });
        }
    }

    useEffect(() => {
        if (!props.isOpen) {
            resetForm();
        }
    }, [props.isOpen, resetForm]);

    return (
        <PopupWithForm
            submitTitle={props.isLoading ? 'Обновляем...' : 'Обновить'}
            name="upd-avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <input
                id="upd-input"
                className={`form__input ${!errors.updInput ? '' : 'form__input-error'}`}
                onChange={handleChange}
                type="url"
                value={values.updInput || ''}
                name="updInput"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="form__span-error upd-input-error" >{errors.updInput}</span>
        </PopupWithForm>
    );
}
