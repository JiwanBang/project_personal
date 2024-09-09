import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { Link } from "react-router-dom";
export interface boardCate {
  id: number;
  category: string;
}

const HeaderCate = () => {
  const [headerCate, setHeaderCate] = useState<boardCate[]>([]);
  useEffect(() => {
    (async () => {
      const callHeaderCate = await instance.get("/category/cateHead", {
        withCredentials: true,
      });
      setHeaderCate(callHeaderCate.data);
      console.log(headerCate);
    })();
  }, []);

  return (
    <ul className="px-[1rem] h-[2rem] w-[320px] flex justify-between items-center">
      {headerCate.map((item, idx) => (
        <Link key={idx} to={`/list/${item.id}`}>
          <li>{item.category.slice(0, 5)}</li>
        </Link>
      ))}
    </ul>
  );
};

export default HeaderCate;
