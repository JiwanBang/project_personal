import { useParams } from "react-router-dom";
import PostElems, { IPost } from "./PostElems";
import { useEffect, useState } from "react";
import instance from "../../lib/axios";

export type Post = IPost[];
export interface IProps {
  item: Post;
}

const Posts = () => {
  const Params = useParams();
  console.log(Params.postID);

  const [post, setPost] = useState<Post>([]);

  useEffect(() => {
    (async () => {
      try {
        const getPost = await instance.get(`/board/${Params.postID}`);
        console.log(getPost.data);
        setPost(getPost.data);
      } catch (err) {
        console.error(err);
      }
    })();
    /* eslint-disable no-unused-vars */
  }, []);

  return (
    <div>
      {post.map((item) => (
        <PostElems
          key={item.id}
          post={item.post}
          id={item.id}
          title={item.title}
          category={item.boardCate.category}
          nickname={item.writer.nickname}
          boardCate={item.boardCate}
          writer={item.writer}
          createdAt={item.createdAt}
          content={item.content}
        ></PostElems>
      ))}
    </div>
  );
};

export default Posts;
