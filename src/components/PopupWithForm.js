import React from 'react';


export default function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  submitTitle,
  class: additionalClass
}) {
  // Compute class names
  const popupClassName = `popup popup_${name} ${isOpen ? 'popup_opened' : ''}`;
  const formClassName = `form form_${name}`;
  const buttonClassName = `form__input-btn ${additionalClass ? 'form__del-btn' : ''}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть Popup"
        />
        <h3 className="popup__title">{title}</h3>
        <form
          className={formClassName}
          name={`popup__form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className={buttonClassName} type="submit">
            {submitTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

