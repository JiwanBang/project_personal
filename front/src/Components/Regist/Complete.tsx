import { Link } from "react-router-dom";

const Complete = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center ">
        <h1 className="font-bold text-[1.3rem] absolute bottom-[50%]">
          회원가입이 완료되었습니다!
        </h1>
      </div>
      <div className="w-full py-5 px-[4rem] absolute bottom-[30%] flex items-between justify-between gap-3 text-[0.9rem]">
        <Link to="/">메인페이지</Link>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default Complete;
