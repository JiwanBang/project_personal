import axios from "axios";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        type="text"
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setUserId(value);
        }}
        placeholder="아이디"
      />
      <input
        type="password"
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setPassword(value);
        }}
        placeholder="패스워드"
      />
      <button
        onClick={async () => {
          console.log(
            "입력 아이디:" + userId + "+" + "입력 비밀번호:" + password
          );
          try {
            await axios.post("http://localhost:8080/users", {
              user_id: userId,
              password: password,
            });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        로그인 버튼
      </button>
    </div>
  );
};

export default Login;
