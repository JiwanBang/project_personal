import { Link } from "react-router-dom";

export interface IItems {
  title: number;
  id: number;
  created_at: number;
  category: string;
  boardCate: { category: string };
}

export interface IProps extends IItems {
  idx: number;
}

const MainList = ({ id, title, created_at, category, boardCate }: IProps) => {
  return (
    <Link to={`/post/${id}`}>
      <li className="flex gap-[0.8rem] px-1 py-[0.1rem]">
        <div className="flex">
          <div>[</div>
          <div className="text-[#2685D5] h-[1.5rem] w-[2rem] text-ellipsis overflow-hidden">
            {category}
          </div>
          <div>]</div>
        </div>
        <span className="w-[20rem] h-[1.5rem] text-ellipsis overflow-hidden">
          {title}
        </span>
        <div className="text-red">[1]</div>
      </li>
    </Link>
  );
};

export default MainList;
