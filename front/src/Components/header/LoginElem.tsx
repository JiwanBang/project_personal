import { useEffect } from "react";
import instance from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../hooks/useContextLogin";

// export const userState = atom({ key: "userLogined", default: false });

const LoginElem = () => {
  const [logined, setLogined] = useRecoilState(userState);
  const LoginBtn = () => {
    return <Link to="/login">로그인</Link>;
  };
  const LogoutBtn = () => {
    const nav = useNavigate();
    const logOut = async () => {
      try {
        const logout = await instance.get("/user", { withCredentials: true });
        console.log(logout);
        if (logout.status === 200) {
          nav("/");
          setLogined(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    return <button onClick={logOut}>로그아웃</button>;
  };

  useEffect(() => {
    const LogCheck = async () => {
      try {
        const logcheck = await instance.get("/user/logCheck", {
          withCredentials: true,
        });
        console.log(logined);
        console.log(logcheck);
        if (logcheck.status === 200) {
          setLogined(true);
          console.log(logcheck);
        } else if (logcheck.status === 218) {
          setLogined(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    LogCheck();
  }, []);
  return <div>{logined ? <LogoutBtn /> : <LoginBtn />}</div>;
};

export default LoginElem;
