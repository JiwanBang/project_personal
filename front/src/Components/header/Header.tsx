import icon from "../../icon/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.webp";
import searchIcon from "../../icon/search_icon.png";
import { Link } from "react-router-dom";
import HeaderCate from "./HeaderCate";
import LoginElem from "./LoginElem";
const Header = () => {
  return (
    <div>
      <div className="w-full h-[80px] bg-[#2685D5]">
        <div className="h-[40px] items-center justify-between flex px-3 font-black text-white">
          <button className="text-[1.5rem]">☰</button>
          <Link to="/">
            <span className="text-[1.2rem]">와글와글 게시판</span>
          </Link>
          <div>
            <LoginElem></LoginElem>
          </div>
        </div>
        <div className="h-[40px] items-center justify-center flex">
          <div className="w-[18rem] flex items-center justify-between rounded-[0.3rem] bg-white px-[1rem]">
            <input
              placeholder="와글와글 통합 검색"
              className="bg-none w-14rem"
            />
            <img src={searchIcon} className="w-[1.2rem] h-[1.2rem]" />
          </div>
        </div>
      </div>
      <div className="border-b-[0.2rem] border-[#abc4d5] font-bold flex items-center justify-center">
        <HeaderCate />
      </div>
    </div>
  );
};

export default Header;
