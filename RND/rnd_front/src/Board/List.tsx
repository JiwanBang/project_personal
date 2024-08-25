import Board from "./Board";
import { useEffect, useState } from "react";
import ListQuery from "./getList";

export interface ITodo {
  id: number;
  title: string;
  post: string;
}
const List = () => {
  const { data, isPending, isFetching } = ListQuery();
  if (isPending || isFetching) return <div>로딩중</div>;
  if (!data || !data.data) return <div>데이터를 불러오는 데 실패했습니다.</div>;
  const Arr = data.data;
  console.log(data.data);
  return (
    <div>
      <Board />
      <div>목록</div>
      {Arr?.map((item: ITodo) => (
        <ul key={item.id}>
          <li>제목: {item.title}</li>
          <li>내용: {item.post}</li>
        </ul>
      ))}
    </div>
  );
};
export default List;
