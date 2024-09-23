import { ChangeEvent, useEffect, useState } from "react";
import instance from "../../lib/axios";
import { useParams } from "react-router-dom";

const CommentElem = () => {
  const [com, setCom] = useState("");
  const params = useParams();
  const submit = async () => {};
  // useEffect(()=>{
  //  const callCom = async() => {
  //   const comment = await instance.get(`/comment/${}`)
  //  }
  // }, [])
  return (
    <div className="flex gap-[0.5rem] justify-center">
      <textarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setCom(e.target.value);
        }}
        className="w-[15rem] h-[3rem] rounded-[0.3rem] border-[0.01rem] p-[0.5rem] text-[0.6rem]"
      />
      <button className="w-[2rem] border-[0.1rem] text-[0.5rem] font-bold rounded-[0.3rem]">
        등록
      </button>
    </div>
  );
};

export default CommentElem;
