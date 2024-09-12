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
  const [uploadImg, setUploadImg] = useState<FormData>();

  const nav = useNavigate();
  const back = () => {
    nav(-1);
  };
  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 5) {
      return alert("이미지를 더 넣을 수 없습니다");
    }
    const formData = new FormData();
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files.item(i) as File);
      }
      setUploadImg(formData);
    }
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setCateValue(value);
    console.log(value);
  };

  useEffect(() => {
    console.log(uploadImg);
  }, [uploadImg]);
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
    if (title === "") {
      alert("제목을 작성해주십시오");
    } else if (content === "") {
      alert("내용을 작성해주십시오");
    } else if (!cateValue) {
      alert("카테고리를 작성해주십시오");
    } else {
      try {
        const submit = async () => {
          const post = await instance.post(
            "/board",
            { title: title, content: content, boardCate: cateValue },
            {
              withCredentials: true,
            }
          );
          console.log(post);
          if (post.status === 201) {
            if (uploadImg) {
              uploadImg.append("postId", post.data.newPost.id);
              const imgUpload = await instance.post(
                "/board/upload",
                uploadImg,
                {
                  headers: { "content-type": "multipart/form-data" },
                  withCredentials: true,
                }
              );
              console.log(imgUpload);
            }
          }
        };
        submit();
        // if (uploadImg) {
        //   console.log(uploadImg);
        //   await instance.post("/board/upload", uploadImg, {
        //     headers: { "content-type": "multipart/form-data" },
        //     withCredentials: true,
        //   });
        // }
      } catch (err) {
        console.error(err);
      }
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
      </div>
      <input
        type="file"
        multiple
        accept="images/*"
        className="border-[#abc4d5]"
        onChange={onChangeImg}
      />

      <div className="absolute bottom-0 w-full px-5 flex justify-between">
        <button onClick={back}>취소</button>
        <button onClick={onSubmit}>작성완료</button>
      </div>
    </div>
  );
};

export default Write;
