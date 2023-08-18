import React, { useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddCardPopup(props, isOpen ) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

   useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleAddPlaceClick({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm
            submitTitle={props.submitTitle}
            name="add-card"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >

            <input
                id="image-input"
                className="form__input form__input_string_place"
                type="text"
                onChange={handleNameChange}
                defaultValue={name}
                name="card_name"
                placeholder="Название"
                maxLength={30}
                minLength={2}
                required
            />
            <span className="form__span-error image-input-error" />
            <input
                id="src-input"
                className="form__input form__input_string_src"
                defaultValue={link}
                type="url"
                onChange={handleLinkChange}
                name="card_src"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="form__span-error src-input-error" />
        </PopupWithForm>
    )
}