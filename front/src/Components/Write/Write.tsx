import React, { ChangeEvent, useEffect, useState } from "react";
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export interface ICate {
  id: number;
  category: string;
}
const Write = () => {
  const [categories, setCategories] = useState<ICate[]>([]);
  const [cateValue, setCateValue] = useState<number>(71);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const nav = useNavigate();
  const back = () => {
    nav(-1);
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setCateValue(value);
    console.log(value);
  };

  useEffect(() => {
    console.log(cateValue);
  }, [cateValue]);

  useEffect(() => {
    const callCate = async () => {
      const callCates = await instance.get("/category");
      setCategories(callCates.data);
    };
    callCate();
    console.log(categories);
  }, []);

  const onSubmit = async () => {
    try {
      if (title === "") {
        alert("제목을 작성해주십시오");
      } else if (content === "") {
        alert("내용을 작성해주십시오");
      } else if (!cateValue) {
        alert("카테고리를 작성해주십시오");
      } else {
        const submit = await instance.post(
          "/board",
          { boardCate: cateValue, title: title, content: content },
          { withCredentials: true }
        );
        console.log(submit);
        if (submit.status == 201) {
          nav(`/post/${submit.data.id}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-y-[0.5rem]">
      <div className="w-full absolute top-[25%] flex items-center flex-col gap-y-[0.5rem] border-[#abc4d5]">
        <select
          onChange={onChange}
          className="border-[0.1rem] rounded-[0.3rem] w-[80%] border-[#abc4d5]"
          value={cateValue}
        >
          {categories.map((item, idx) => (
            <option key={item.id} value={item.id}>
              {item.category}
            </option>
          ))}
        </select>
        <input
          className="w-[80%] border-[0.1rem] rounded-[0.3rem] border-[#abc4d5]"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
          }}
          className="w-[80%] h-[10rem] border-[0.1rem] rounded-[0.3rem] border-[#abc4d5]"
        />
        <input type="files border-[#abc4d5]" />
      </div>
      <div className="absolute bottom-0 w-full px-5 flex justify-between">
        <button onClick={back}>취소</button>
        <button onClick={onSubmit}>작성완료</button>
      </div>
    </div>
  );
};

export default Write;
