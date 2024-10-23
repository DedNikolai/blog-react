import React from "react";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import {useParams, Navigate} from 'react-router-dom';
import {usePost} from '../api/queries/usePost';
import Markdown from 'react-markdown';

export const FullPost = () => {
  const {id} = useParams();
  const {data, isPending} = usePost(id);

  if (isPending) {
    return <Post isLoading={isPending} />
  }

  if (!data?._id) return <Navigate to='*' />

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={{
          avatarUrl: data.user.avatarUrl,
          fullName: data.user.fullName,
          _id: data.user._id
        }}
        createdAt={data.createdAt.slice(0, 10)}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <Markdown>
          {data.text}
        </Markdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
