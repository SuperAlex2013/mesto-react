import React, { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function ProfileButton({ onClick, ariaLabel, className, children }) {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            type="button"
            className={className}
        >
            {children}
        </button>
    );
}

function UserProfile({ onEditAvatar, onEditProfile, onAddPlace }) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <section className="profile page__profile">
            <ProfileButton onClick={onEditAvatar} className="profile__avatar-btn">
                <img
                    className="profile__avatar"
                    src={currentUser.avatar}
                    alt="Аватарка"
                />
            </ProfileButton>
            <div className="profile__info">
                <h1 className="profile__name">{currentUser.name}</h1>
                <ProfileButton 
                    onClick={onEditProfile}
                    ariaLabel="Редактировать профиль"
                    className="profile__edit-btn"
                />
                <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <ProfileButton
                onClick={onAddPlace}
                ariaLabel="Добавление карточки"
                className="profile__add-btn"
            />
        </section>
    );
}

function CardsList({ cards, onCardLike, onCardDeleteClick, onCardClick }) {
    return (
        <section className="elements page__cards">
            <ul className="elements__grids list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        {...card}
                        ownerId={card.owner._id}
                        onCardLike={onCardLike}
                        onCardDeleteClick={onCardDeleteClick}
                        onCardClick={onCardClick}
                    />
                ))}
            </ul>
        </section>
    );
}

export default function Main({
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    cards,
    onCardLike,
    onCardDeleteClick,
    onCardClick
}) {
    return (
        <main>
            <UserProfile 
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
            />
            <CardsList 
                cards={cards}
                onCardLike={onCardLike}
                onCardDeleteClick={onCardDeleteClick}
                onCardClick={onCardClick}
            />
        </main>
    )
}
