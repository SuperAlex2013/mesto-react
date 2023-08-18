import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from './ConfirmDeletePopup';
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = useState('');

    const [editSubmitTitle, setEditSubmitTitle] = useState("Сохранить");
    const [avatarSubmitTitle, setAvatarSubmitTitle] = useState("Обновить");
    const [addSubmitTitle, setAddSubmitTitle] = useState("Добавить");
    const [addConfirmTitle, setAddConfirmTitle] = useState("Да");

    const handlePopup = isEditProfilePopupOpen || isAddCardPopupOpen || isEditAvatarPopupOpen || selectedCard || isConfirmDelCardPopupOpen;

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
        setSelectedCard(null);
    }

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        const handleOverlay = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closeAllPopups();
            }
        };

        if (handlePopup) {
            document.addEventListener('keydown', closeByEscape);
            document.addEventListener('mousedown', handleOverlay);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
                document.removeEventListener('mousedown', handleOverlay);
            }
        }
    }, [handlePopup]);

    useEffect(() => {
        api.getDataUser()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(cardId, likes) {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(cardId, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((element) => (element._id === cardId ? newCard : element)));
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete() {
        setAddConfirmTitle("Сохраняем...");
        api.deleteCard(cardId)
            .then(() => {
                setCards(cards.filter(item => item._id !== cardId));
            })
            .catch((error) => console.log(error))
            .finally(() => {
                closeAllPopups();
                setAddConfirmTitle("Да");
            });
    }

    function handleCardDeleteClick(card) {
        setCardId(card);
        setIsConfirmDelCardPopupOpen(true);
    }

    function handleUpdateUser(userData) {
        setEditSubmitTitle("Сохраняем...");
        api.saveDataInfo(userData)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setEditSubmitTitle("Сохранить");
            });
    }

    function handleUpdateAvatar(userData) {
        setAvatarSubmitTitle("Обновляем...");
        api.saveDataProfile(userData)
            .then((userAvatar) => {
                setCurrentUser(userAvatar);
                closeAllPopups();
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setAvatarSubmitTitle("Обновить");
            });
    }

    function handleAddPlaceSubmit(inputValues) {
        setAddSubmitTitle("Добавляем...");
        api.saveCardInfo(inputValues)
            .then(cardData => {
                setCards([cardData, ...cards]);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => {
                setAddSubmitTitle("Добавить");
            });
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    handleEditProfileClick={() => setIsEditProfilePopupOpen(true)}
                    handleAddPlaceClick={() => setIsAddCardPopupOpen(true)}
                    handleEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
                    onCardLike={handleCardLike}
                    onCardDeleteClick={handleCardDeleteClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                />
                <Footer />
                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    submitTitle={editSubmitTitle}
                />
                <AddCardPopup
                    isOpen={isAddCardPopupOpen}
                    onClose={closeAllPopups}
                    handleAddPlaceClick={handleAddPlaceSubmit}
                    submitTitle={addSubmitTitle}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    submitTitle={avatarSubmitTitle}
                />
                <ConfirmDeletePopup
                    isOpen={isConfirmDelCardPopupOpen}
                    onClose={closeAllPopups}
                    onConfirm={handleCardDelete}
                    submitTitle={addConfirmTitle}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
