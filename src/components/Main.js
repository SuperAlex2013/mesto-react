import React, { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Main({
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    onCardLike,
    onCardDeleteClick,
    onCardClick,
    cards
}) {
    const { avatar, name, about } = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile page__profile">
                <button onClick={handleEditAvatarClick} className="profile__avatar-btn" type="button">
                    <img
                        className="profile__avatar"
                        src={avatar}
                        alt="Аватарка"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{name}</h1>
                    <button
                        onClick={handleEditProfileClick}
                        aria-label="Редактировать профиль"
                        type="button"
                        className="profile__edit-btn"
                    />
                    <p className="profile__subtitle">{about}</p>
                </div>
                <button
                    onClick={handleAddPlaceClick}
                    aria-label="Добавление карточки"
                    type="button"
                    className="profile__add-btn"
                />
            </section>
            <section className="elements page__cards">
                <ul className="elements__grids list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            name={card.name}
                            link={card.link}
                            ownerId={card.owner._id}
                            likes={card.likes}
                            onCardLike={onCardLike}
                            cardId={card._id}
                            onCardDeleteClick={onCardDeleteClick}
                            onCardClick={onCardClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}
