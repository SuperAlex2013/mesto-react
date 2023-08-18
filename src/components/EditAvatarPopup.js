import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  submitTitle,
  isOpen,
  onClose,
  onUpdateAvatar
}) {
  const ref = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  useEffect(() => {
    if (typeof onUpdateAvatar !== 'function') {
      console.error('The prop `onUpdateAvatar` is required and should be a function');
    }

    if (typeof onClose !== 'function') {
      console.error('The prop `onClose` is required and should be a function');
    }

    if (typeof isOpen !== 'boolean') {
      console.error('The prop `isOpen` is required and should be a boolean');
    }
  }, [onUpdateAvatar, onClose, isOpen]);

  return (
    <PopupWithForm
      submitTitle={submitTitle || "Submit"}
      name="upd-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="upd-input"
        ref={ref}
        className="form__input"
        type="url"
        name="updInput"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__span-error upd-input-error" />
    </PopupWithForm>
  );
}
