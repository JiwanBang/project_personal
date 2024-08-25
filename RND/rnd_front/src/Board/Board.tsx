import axios from "axios";
import { ChangeEvent, useState } from "react";

const Board = () => {
  const [title, settitle] = useState("");
  const [post, setpost] = useState("");
  return (
    <div>
      <input
        type="text"
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          settitle(value);
        }}
        placeholder="제목"
      />
      <input
        type="password"
        onInput={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setpost(value);
        }}
        placeholder="내용"
      />

      <button
        onClick={async () => {
          try {
            await axios.post("http://localhost:8080/board/write", {
              title: title,
              post: post,
            });
            window.location.reload();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        글쓰기
      </button>
    </div>
  );
};

export default Board;
