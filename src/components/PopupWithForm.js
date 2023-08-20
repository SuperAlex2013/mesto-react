export default function PopupWithForm({ 
  isOpen,
  onClose,
  name,
  title,
  onSubmit,
  submitTitle,
  children,
  elemClass,
  isValid
}) {
  // Helper function to compose class names
  const getClassName = (base, condition, nameOnTrue, nameOnFalse = '') => 
      condition ? `${base} ${nameOnTrue}` : `${base} ${nameOnFalse}`;

  // Popup class name
  const popupClassName = getClassName(`popup popup_${name}`, isOpen, 'popup_opened');

  // Submit button class name
  const submitButtonClassName = getClassName(
      `form__input-btn`,
      isValid,
      '',
      'form__input-btn_disabled'
  ) + (elemClass ? ' form__del-btn' : '');

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
                  className={`form form_${name}`}
                  name={`popup__form-${name}`}
                  onSubmit={onSubmit}
              >
                  {children}
                  <button
                      disabled={!isValid}
                      className={submitButtonClassName}
                      type="submit"
                  >
                      {submitTitle}
                  </button>
              </form>
          </div>
      </div>
  );
}
