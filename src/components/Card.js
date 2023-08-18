import React, { useContext } from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({
  ownerId, 
  likes = [], 
  onCardClick, 
  onCardLike, 
  onCardDeleteClick, 
  cardId, 
  link, 
  name, 
  keys
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = ownerId === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardElementButtonClassName = `card__like ${isLiked ? "card__like_active" : ""}`;

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike(cardId, likes);
  }
  
  function handleDeleteCard() {
    onCardDeleteClick(cardId);
  }

  return (
    <li key={keys} className="elements__items">
      <article className="card">
        {isOwn && (
          <button
            aria-label="Удалить"
            className="card__trash card_trash_visible"
            type="button"
            onClick={handleDeleteCard}
          />
        )}
        <img className="card__item"
             src={link}
             alt={name}
             onClick={handleClick}
        />

        <div className="card__desc">
          <h2 className="card__title">{name}</h2>
          <div className="card__place">
            <button aria-label="Лайк"
                type="button"
                className={cardElementButtonClassName}
                onClick={handleLikeClick}
            />
            <p className="card__like-count">{likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}
