import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../lib/axios";
import { useRecoilState } from "recoil";
import { userState } from "../../hooks/useContextLogin";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 10,
  },
};

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [logined, setLogined] = useRecoilState(userState);

  const [idInput, setIdInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (userId === "") {
      setIdInput(true);
    } else if (password === "") {
      setPasswordInput(true);
    } else {
      const login = await instance.post(
        "/user",
        { user_id: userId, password: password },
        { withCredentials: true }
      );
      console.log(login);
      if (login.status === 210) {
        alert(login.data.message);
      } else if (login.status === 201) {
        alert(login.data.message);
        setLogined(true);
        navigate("/");
      }
    }
  };

  return (
    <div className="flex justify-center w-[20rem]">
      <Modal
        style={customStyles}
        isOpen={idInput}
        onRequestClose={() => {
          setIdInput(false);
        }}
      >
        아이디를 입력해주세요
      </Modal>
      <Modal
        style={customStyles}
        isOpen={passwordInput}
        onRequestClose={() => {
          setPasswordInput(false);
        }}
      >
        패스워드를 입력해주세요
      </Modal>

      <div className="absolute bottom-[40%]">
        <div className="py-2">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUserId(e.target.value);
            }}
            className="rounded-[0.3rem] border-[0.1rem] border-[gray] w-[15rem] h-[2rem] px-[1rem]"
            placeholder="아이디"
          />
        </div>
        <div className="py-2">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            className="rounded-[0.3rem] border-[0.1rem] border-[gray] w-[15rem] h-[2rem] px-[1rem]"
            placeholder="비밀번호"
            type="password"
          />
        </div>
        <button
          onClick={onSubmit}
          className="my-2 bg-[blue] text-white w-[50%] h-[2rem]"
        >
          로그인
        </button>
      </div>
      <div className="flex w-full justify-between absolute bottom-0 text-[0.7rem] p-3">
        <span>
          <Link to="/regist">회원가입</Link>
        </span>
        <span>아이디, 비밀번호 찾기</span>
      </div>
    </div>
  );
};

export default Login;
