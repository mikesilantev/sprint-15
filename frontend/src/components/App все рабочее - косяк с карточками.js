/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupEditProfile from "./PopupEditProfile";
import PopupAddCard from "./PopupAddCard";
import PopupAddAvatar from "./PopupAddAvatar";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";

function App() {
//
// const [loading, setIsLoading] = useState(false);
//
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOnen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [submitTextPopup, setSubmitTextPopup] = useState('');

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({
    name: '',
    text: '',
  });

  useEffect(() => {
    function handleCheckToken(){
      const jwt = localStorage.getItem('jwt');
      if(jwt) {
        auth.checkUserToken(jwt)
          .then((res) => {
            setUserEmail(res.email);
            setLoggedIn(true);
            navigate('/');
          }).catch((err) => {
            console.error(err);
          });
      }
    }
    handleCheckToken();

    if(loggedIn) {
      const jwt = localStorage.getItem('jwt');
      api
        .getStartUserInfo(jwt)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
      
      api
        .getCards(jwt)
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, loggedIn]);

  function handleRegister(data) {
    auth
      .register(data)
      .then((res) => {
        setUserEmail(res.email);
      })
      .then(() =>{
        handleOnLogin(data);
      })
      .then(() => {
        hadleInfoTooltip({
          name: 'succes',
          text: 'Вы успешно зарегестрировались!'
        });
      })
      .catch((err) => {
        hadleInfoTooltip({
          name: 'error',
          text: 'Произошла ошибка!'
        });
        console.error(err);
        return [];
      })
  }

  function handleOnLogin(data) {
    auth
      .authorize(data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        hadleInfoTooltip({
          name: 'error',
          text: 'Произошла ошибка!'
        });
        console.error(err);
        return [];
      })
  }

  function handleOnSignOut() {
    setLoggedIn(false);
    navigate('/signin');
    localStorage.removeItem("jwt");
    setUserEmail('');
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setSubmitTextPopup('Сохранить');
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setSubmitTextPopup('Добавить');
    setIsAddPlacePopupOnen(true);
  }

  function handleEditAvatarClick() {
    setSubmitTextPopup('Сохранить');
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOnen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setSubmitTextPopup('');
    setIsInfoTooltipPopupOpen(false);
  }

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   Promise.all([
  //     api.getStartUserInfo(jwt),
  //     api.getCards(jwt)
  //     ])
  //     .then(([user, cards]) => {
  //       setCurrentUser(user);
  //       setCards(cards);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);


  function handleUpdateUser(user) {
    const jwt = localStorage.getItem('jwt');
    setSubmitTextPopup('Сохранение...');
    api
      .setUserInfo(user, jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups()
        setSubmitTextPopup('Сохранено');
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  function handleUpdateAvatar({ avatar }) {
    const jwt = localStorage.getItem('jwt');
    setSubmitTextPopup('Сохранение...');
    api
      .setUserAvatar(avatar.value, jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        return [];
      })
      .finally(() => {
        setSubmitTextPopup('Сохранено');
      });
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some((like) => like === currentUser._id);

    api.changeLikesCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('jwt');
    api
      .deleteCardData(card._id, jwt)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      }).catch((err) => {
        console.error(err);
        return [];
      });
  }

  function handleAddPlaceSubmit(card) {
    const jwt = localStorage.getItem('jwt');
    setSubmitTextPopup('Добавляем...');
    
    api.sendCardData(card, jwt)
      .then((newCard) => {
        // console.log(card);
        // console.log(jwt);
        // console.log(newCard);
        setCards([newCard, ...cards]);
        console.log(newCard);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        setSubmitTextPopup('Что-то пошло не так...');
        console.error(err);

        return [];
      })
      .finally(() => {
        setSubmitTextPopup('Добавлено');
      })
  }

  function hadleInfoTooltip(params) {
    setIsInfoTooltipPopupOpen(true);
    setInfoTooltip(params);
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        isLogged={loggedIn} 
        onSignOut={handleOnSignOut} 
        userEmail={userEmail}
        />
      <Routes>
        <Route path="*" element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path="*" element={
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              setCards={setCards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />} />
        </Route>
        <Route path="*" element={<Footer />} />
        <Route
          path="/signin"
          element={
            <Login
              onLogin={handleOnLogin} />} />
        <Route
          path="/signup"
          element={
            <Register
              onRegister={handleRegister} />} />
      </Routes>
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        submitTextPopup={submitTextPopup}
      />
      <PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        submitTextPopup={submitTextPopup}
      />
      <PopupAddAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        submitTextPopup={submitTextPopup}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoToolTip
        name={infoTooltip.name}
        onClose={closeAllPopups}
        isOpen={isInfoTooltipPopupOpen}
        infoText={infoTooltip.text}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
