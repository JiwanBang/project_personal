import axios from "axios";
import { ChangeEvent, useState } from "react";

const Regist = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
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
      <input
        type="text"
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setNickname(value);
        }}
        placeholder="닉네임"
      />
      <input
        type="text"
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setPhoneNum(value);
        }}
        placeholder="폰번호"
      />

      <button
        onClick={async () => {
          console.log(
            "입력 아이디:" + userId + "+" + "입력 비밀번호:" + password
          );
          try {
            await axios.post("http://localhost:8080/users/regist", {
              user_id: userId,
              password: password,
              nickname: nickname,
              phoneNum: phoneNum,
            });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        가입하기
      </button>
    </div>
  );
};

export default Regist;
