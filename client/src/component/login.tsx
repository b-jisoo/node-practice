import axios from "axios";
import { useState } from "react";

type login = {
  id: String;
  password: String;
};

const LOGIN_URL = "http://localhost:4000/login";

const Login = () => {
  const handleonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = (e.currentTarget.elements.namedItem("id") as HTMLInputElement)
      .value;
    const pasword = (
      e.currentTarget.elements.namedItem("pasword") as HTMLInputElement
    ).value;
    console.log(id, pasword);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <form onSubmit={handleonSubmit}>
        <input
          id="id"
          type="id"
          name="id"
          placeholder="아이디"
          minLength={4}
          required
        />
        <br />
        <input
          id="pasword"
          name="pasword"
          type="password"
          placeholder="비밀번호"
          minLength={4}
          required
        />
        <br />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default Login;
