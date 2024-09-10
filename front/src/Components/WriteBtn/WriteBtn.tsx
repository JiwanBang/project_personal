import { useRecoilState } from "recoil";
import { userState } from "../../hooks/useContextLogin";
import { Link } from "react-router-dom";

const WriteBtn = () => {
  const [logined, setLogined] = useRecoilState(userState);
  const LoginToWrite = () => {
    return (
      <div className="flex items-center justify-center border-[0.1rem] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
        <Link to="/login">글쓰기</Link>
      </div>
    );
  };
  const LoginedWrite = () => {
    return (
      <div className="flex items-center justify-center border-[0.1rem] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
        <Link to="/write">글쓰기</Link>
      </div>
    );
  };
  return <div>{logined ? <LoginedWrite /> : <LoginToWrite />}</div>;
};

export default WriteBtn;
