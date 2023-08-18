import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onUpdateUser, submitTitle, onClose }) {

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setAbout(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleSetName(evt) {
        setName(evt.target.value);
    }

    function handleSetAbout(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about,
        });
    }

    return (
        <PopupWithForm
            name="edit-user"
            title="Редактировать профиль"
            submitTitle={submitTitle}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="name-input"
                className="form__input form__input_string_name"
                type="text"
                value={name}
                onChange={handleSetName}
                name="user_name"
                placeholder="Ваше имя"
                maxLength={40}
                minLength={2}
            />
            <span className="form__span-error name-input-error" />
            <input
                id="user-job-input"
                className="form__input form__input_string_job"
                type="text"
                name="user_job"
                value={about}
                onChange={handleSetAbout}
                placeholder="О себе"
                maxLength={200}
                minLength={2}
            />
            <span className="form__span-error user-job-input-error" />

        </PopupWithForm>
    );
}
