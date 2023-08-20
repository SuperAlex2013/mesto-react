import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ 
    ownerId, 
    likes = [], 
    onCardClick, 
    onCardLike, 
    onCardDeleteClick, 
    cardId, 
    name, 
    link 
}) {
    const currentUser = useContext(CurrentUserContext);
    
    if (!currentUser) return null;

    const isOwn = ownerId === currentUser._id;
    const isUserLiked = likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = `card__like ${isUserLiked ? "card__like_active" : ""}`;

    function handleCardClick() {
        onCardClick({ name, link });
    }

    function handleLikeClick() {
        onCardLike(cardId, likes);
    }

    function handleDeleteCard() {
        onCardDeleteClick(cardId);
    }

    return (
        <li key={cardId} className="elements__items">
            <article className="card">
                {isOwn && (
                    <button
                        aria-label="Delete"
                        className="card__trash card_trash_visible"
                        type="button"
                        onClick={handleDeleteCard}
                    />
                )}
                <img 
                    className="card__item"
                    src={link}
                    alt={name}
                    onClick={handleCardClick}
                />
                <div className="card__desc">
                    <h2 className="card__title">{name}</h2>
                    <div className="card__place">
                        <button 
                            aria-label="Like"
                            type="button"
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                        />
                        <p className="card__like-count">{likes.length}</p>
                    </div>
                </div>
            </article>
        </li>
    );
}

Card.propTypes = {
    ownerId: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired
        })
    ),
    onCardClick: PropTypes.func.isRequired,
    onCardLike: PropTypes.func.isRequired,
    onCardDeleteClick: PropTypes.func.isRequired,
    cardId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default Card;
