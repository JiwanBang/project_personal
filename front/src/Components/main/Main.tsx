import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import pic1 from "../../Pictures/1610707720776.jpg";
import MainList, { IItems } from "./MainList";

export type List = IItems[];
export interface IProps {
  list: List;
}
const Main = () => {
  const [mainLists, setMainLists] = useState<List>([]);
  useEffect(() => {
    (async () => {
      try {
        const board = await instance.get("/board", { withCredentials: true });
        const data = board.data;
        console.log(data);
        setMainLists(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <div className="w-full border-b-[0.2rem] border-[#abc4d5] pb-1">
        <ul className="flex-col items-start justify-start text-start ">
          <h1 className="font-bold text-[1.2rem] px-3 py-[0.2rem]">
            최신 게시글
          </h1>
          {mainLists.map((item, idx) => (
            <MainList
              key={item.id}
              idx={idx}
              id={item.id}
              title={item.title}
              boardCate={item.boardCate}
              category={item.boardCate.category}
              created_at={item.created_at}
            ></MainList>
          ))}
        </ul>
      </div>
      <div className="w-full border-b-[0.2rem] border-[#abc4d5] pb-1">
        <ul className="flex-col items-start justify-start text-start ">
          <h1 className="font-bold text-[1.2rem] px-3 py-[0.2rem]">
            사진 게시판
          </h1>
          <li className="flex gap-[0.8rem] px-1 py-[0.1rem]">
            <img src={pic1} className="w-[5rem] h-[5rem] rounded-[0.7rem]" />
            <div>
              <div>오늘 점심 메뉴 추천받아요</div>
              <div>2024.09.07 16:56</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
