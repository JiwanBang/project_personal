import WriteBtn from "../WriteBtn/WriteBtn";
import CommentElem from "./CommentElem";

export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  writer: { id: number; nickname: string };
  boardCate: { id: number; category: string };
  post: [{ id: number; img_url: string }];
  category: string;
  nickname: string;
}
const PostElems = ({
  id,
  title,
  content,
  createdAt,
  writer,
  boardCate,
  nickname,
  post,
}: IPost) => {
  let date = createdAt.slice(0, 10);
  let cate = boardCate.category.slice(0, 4);
  return (
    <div>
      <div className="border-b-[0.2rem] border-[#abc4d5] py-[0.5rem]">
        <div className="flex items-center justify-center text-center text-[0.8rem]">
          <span className="flex items-center justify-center">
            <span>[</span>
            <div className="text-bold w-[2rem] font-bold">{cate}</div>
            <span>]</span>
          </span>
          <span>{title}</span>
        </div>
        <div className="flex justify-between text-[0.8rem] px-3">
          <div>
            <span>{writer.nickname}</span>
          </div>
          <div className="flex gap-3">
            <span>댓글 8개</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <div className="py-[1rem] text-start px-[1rem] text-[0.8rem]">
        {post.map((item) => (
          <img
            key={item.id}
            src={item.img_url}
            // className="w-[300px] h-[200px]"
          />
        ))}
        <span className="break-words ">{content}</span>
      </div>
      <div>
        <CommentElem></CommentElem>
      </div>
      <div className="pt-[1rem] flex justify-center gap-[1.5rem] text-[0.7rem]">
        <button className="border-[0.1rem] border-[grey] text-[grey] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
          목록
        </button>
        <button className="border-[0.1rem] border-[grey] text-[grey] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
          이전
        </button>
        <button className="border-[0.1rem] border-[grey] text-[grey] rounded-[0.3rem] w-[2.5rem] h-[1.5rem]">
          다음
        </button>
        <WriteBtn />
      </div>
    </div>
  );
};

export default PostElems;
