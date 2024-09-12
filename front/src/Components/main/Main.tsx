import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import MainList, { IItems } from "./MainList";
import Img from "./ImgElems/Img";

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
          <Img />
        </ul>
      </div>
    </div>
  );
};

export default Main;
