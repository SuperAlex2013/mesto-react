export default function ImagePopup({ card: { link, name }, isOpen, onClose }) {
  return (
      <div className={`popup popup_img-card ${isOpen ? 'popup_opened' : ''}`}>
          <div className="popup__img-container">
              <button
                  aria-label="Закрыть Popup"
                  type="button"
                  className="popup__close"
                  onClick={onClose}
              />
              <img className="popup__zoom-image" src={link} alt={name} />
              <h3 className="popup__zoom-title">{name}</h3>
          </div>
      </div>
  );
}
