import React from "react";
import AuthForm from "./AuthForm";
export default function Login({ onLogin }) {
  return <AuthForm title="Вход" buttonText="Войти" onSubmit={onLogin} />;
}
