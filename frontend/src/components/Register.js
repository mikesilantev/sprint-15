import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default function Register({ onRegister }) {
  return (
    <>
      <AuthForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={onRegister} />

      <p className="auth__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="auth__link link">
          Войти
        </Link>
      </p>

    </>
  );
}