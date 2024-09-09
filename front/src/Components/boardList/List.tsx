import { Link, useParams } from "react-router-dom";
import instance from "../../lib/axios";
import { useEffect, useState } from "react";

export interface IList {
  id: number;
  title: string;
  writer: { id: number; nickname: string };
  boardCate: { id: number; category: string };
  createdAt: string;
}

const List = () => {
  const Params = useParams<{ listID: string }>();
  const [postList, setPostList] = useState<IList[]>([]);
  const [board, setBoard] = useState("");
  useEffect(() => {
    const getList = async () => {
      const callList = await instance.get(`/board/cate/${Params.listID}`, {
        withCredentials: true,
      });
      setPostList(callList.data);
      console.log(postList);
      setBoard(callList.data[0].boardCate.category);
    };
    if (Params.listID) getList();
  }, [Params.listID]);

  return (
    <div>
      <ul>
        <div className="text-start flex py-[0.5rem] px-[2rem] border-b-[0.1rem] border-[#abc4d5]">
          {board} 게시판
        </div>
        {postList.map((item, idx) => (
          <Link to={`/post/${item.id}`}>
            <li
              key={idx}
              className="border-b-[0.1rem] border-[#abc4d5] border-y-[grey]"
            >
              <div className="flex gap-[1rem] px-3 pt-3">
                <div className="text-grey">{item.id}.</div>
                <div className="text-ellipsis overflow-hidden w-[16rem] h-[1.8rem]">
                  {item.title}
                </div>
              </div>
              <div className="flex text-[0.7rem] gap-[1rem] justify-between px-3 pb-3">
                <div>{item.writer.nickname}</div>
                <div>{item.createdAt.slice(0, 10)}</div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <div className="pt-[1rem] flex justify-center gap-[1.5rem] text-[0.7rem]">
        <button className="border-[0.1rem] border-[grey] text-[grey] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
          최근
        </button>
        <button className="border-[0.1rem] border-[grey] text-[grey] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
          다음
        </button>
        <button className="border-[0.1rem] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default List;
