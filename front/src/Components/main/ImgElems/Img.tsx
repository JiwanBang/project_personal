import { useEffect, useState } from "react";
import instance from "../../../lib/axios";
import { Link } from "react-router-dom";

export interface Iprops {
  id: number;
  img_url: string;
  post: { id: number; title: string; createdAt: string };
}

const Img = () => {
  const [Img, setImg] = useState<Iprops[]>([]);
  useEffect(() => {
    const imgCall = async () => {
      const imgs = await instance("/pictures", { withCredentials: true });
      console.log(imgs.data);
      setImg(imgs.data);
    };
    imgCall();
  }, []);
  return (
    <div>
      {Img.map((item) => (
        <li className="flex gap-[0.8rem] px-1 py-[0.1rem]">
          <div className="w-[6rem] h-[5rem] rounded-[0.7rem] overflow-hidden">
            <img src={item.img_url} />
          </div>
          <Link to={`/post/${item.post.id}`}>
            <div>
              <div>{item.post.title}</div>
              <div>{item.post.createdAt}</div>
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Img;
