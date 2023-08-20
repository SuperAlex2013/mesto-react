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
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePopup = isEditProfilePopupOpen || isAddCardPopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isConfirmDelCardPopupOpen;

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
        setIsImagePopupOpen(false);
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
            .then((userData) => setCurrentUser(userData))
            .catch(console.error);
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => setCards(initialCards))
            .catch(console.error);
    }, []);

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardLike(cardId, likes) {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(cardId, !isLiked)
            .then((newCard) => setCards((state) => state.map((element) => (element._id === cardId ? newCard : element))))
            .catch(console.error);
    }

    function handleCardDelete() {
        setIsLoading(true);
        api.deleteCard(cardId)
            .then(() => {
                setCards(cards.filter(item => item._id !== cardId));
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleCardDeleteClick(card) {
        setCardId(card);
        setIsConfirmDelCardPopupOpen(true);
    }

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api.saveDataInfo(userData)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleUpdateAvatar(userData) {
        setIsLoading(true);
        api.saveDataProfile(userData)
            .then((userAvatar) => {
                setCurrentUser(userAvatar);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleAddPlaceSubmit(inputValues) {
        setIsLoading(true);
        api.saveCardInfo(inputValues).then(cardData => {
            setCards([cardData, ...cards]);
            closeAllPopups();
        })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                handleEditProfileClick={setIsEditProfilePopupOpen}
                handleAddPlaceClick={setIsAddCardPopupOpen}
                handleEditAvatarClick={setIsEditAvatarPopupOpen}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                onCardClick={handleCardClick}
                cards={cards}
            />
            <Footer date={new Date().getFullYear()} />
            <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                isLoading={isLoading}
            />
            <AddCardPopup
                isOpen={isAddCardPopupOpen}
                onClose={closeAllPopups}
                handleAddPlaceClick={handleAddPlaceSubmit}
                isLoading={isLoading}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
            />
            <ImagePopup
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
                card={selectedCard}
            />
            <ConfirmDeletePopup
                isOpen={isConfirmDelCardPopupOpen}
                onClose={closeAllPopups}
                onConfirm={handleCardDelete}
                isLoading={isLoading}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
