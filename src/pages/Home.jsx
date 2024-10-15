import React, {useMemo} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import usePosts from '../queries/usePosts';
import {useTags} from '../queries/useTags';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const {data, isPending} = usePosts();
  const tags = useTags();

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isPending ?
          ([...Array(3)]).map((__, index) => (
            <Post
              key={index}
              isLoading={isPending}
            />
          ))
          :
          data.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              user={{
                avatarUrl: post.user.avatarUrl,
                fullName: post.user.fullName,
              }}
              createdAt={post.createdAt.slice(0, 10)}
              viewsCount={post.viewCount}
              commentsCount={3}
              tags={post.tags}
              isEditable
              isLoading={isPending}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.data} isLoading={tags.isPending} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
