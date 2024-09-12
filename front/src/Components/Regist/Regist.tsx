import { ChangeEvent, useState } from "react";
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const Regist = () => {
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (userId === "") {
      alert("아이디를 확인해주십시오");
    } else if (password === "") {
      alert("비밀번호를 확인해주십시오");
    } else if (nickname === "") {
      alert("닉네임을 확인해주십시오");
    } else if (phone === "") {
      alert("전화번호를 확인해주십시오");
    } else {
      const submit = await instance.post(
        "/user/regist",
        {
          user_id: userId,
          phone_num: phone,
          nickname: nickname,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(submit);

      if (submit.status === 298) {
        alert(submit.data.message);
      } else if (submit.status === 297) {
        alert(submit.data.message);
      } else if (submit.status === 296) {
        alert(submit.data.message);
      } else if (submit.status === 201) {
        navigate("/regist/done");
      }
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="absolute bottom-[20%]">
        <div className="pt-1">
          <div className="flex text-start text-[0.9rem] px-[0.5rem] py-[0.2rem]">
            아이디
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUserId(e.target.value);
            }}
            className="rounded-[0.3rem] border-[0.1rem] border-[gray] w-[15rem] h-[2rem] px-[1rem]"
            placeholder="아이디"
          />
        </div>
        <div className="pt-1">
          <div className="flex text-start text-[0.9rem] px-[0.5rem] py-[0.2rem]">
            비밀번호{" "}
          </div>

          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            className="rounded-[0.3rem] border-[0.1rem] border-[gray] w-[15rem] h-[2rem] px-[1rem]"
            placeholder="비밀번호"
            type="password"
          />
        </div>
        <div className="py-1">
          <div className="flex text-start text-[0.9rem] px-[0.5rem] py-[0.2rem]">
            닉네임
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNickname(e.target.value);
            }}
            className="rounded-[0.3rem] border-[0.1rem] border-[gray] w-[15rem] h-[2rem] px-[1rem]"
            placeholder="닉네임"
          />
        </div>
        <div className="py-2">
          <div className="flex text-start text-[0.9rem] px-[0.5rem] py-[0.2rem]">
            전화번호
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPhone(e.target.value);
            }}
            className="rounded-[0.3rem] border-[0.1rem] border-[gray] w-[15rem] h-[2rem] px-[1rem]"
            placeholder="전화번호"
            type="number"
          />
        </div>
        <button
          onClick={onSubmit}
          className="my-2 bg-[blue] text-white w-[50%] h-[2rem]"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Regist;
