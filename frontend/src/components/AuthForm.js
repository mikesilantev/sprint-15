import React, {useState} from "react";
export default function AuthForm({ title, buttonText, onSubmit}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt){
    setEmail(evt.target.value)
    // console.log(email)
  }
  function handleChangePassword(evt){
  setPassword(evt.target.value);
  // console.log(password)
  }

  function handleSubmit(e){
    e.preventDefault();
    onSubmit({
      email: email, 
      password: password
    })
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <form 
        className="auth__form"
        onSubmit={handleSubmit}>
        <input
          className="auth__input"
          // type="email"
          name="username"
          value={email || ''}
          onChange={handleChangeEmail}
          required
          minLength="2"
          maxLength="30"
          placeholder="Email"

        ></input>
        <input
          className="auth__input"
          type="password"
          name="password"
          onChange={handleChangePassword}
          value={password || ''}
          required
          minLength="2"
          maxLength="30"
          placeholder="Пароль"
          autoComplete="on"
        ></input>
        <button
          className="auth__submit"
          type="submit"
          value={buttonText}
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}