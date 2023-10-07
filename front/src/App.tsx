import { useState, FC, useEffect } from 'react';
import 'modern-css-reset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';
import { NewBlogPayload, Blog, Tag, NewTagPayload, UpdateBlogPayload } from './types/blog';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import { addBlogItem, getBlogItems, updateBlogItem, deleteBlogItem } from './lib/api/blog';
import { addTagItem, getTagItems, deleteTagItem } from './lib/api/tag';
import SideNav from './components/SideNav';


const BlogApp: FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filterTagId, setFilterTagId] = useState<number | null>(null);

  const onSubmit = async (payload: NewBlogPayload) => {
    if (!payload.body || !payload.title) return;

    await addBlogItem(payload)
    const blogs = await getBlogItems()
    setBlogs(blogs)
  }

  const onUpdate = async (updateBlog: UpdateBlogPayload) => {
    await updateBlogItem(updateBlog)
    const blogs = await getBlogItems();
    setBlogs(blogs)
  }

  const onDelete = async (id: number) => {
    await deleteBlogItem(id)
    const blogs = await getBlogItems();
    setBlogs(blogs)
  }

  const onSelectTag = (tag: Tag | null) => {
    setFilterTagId(tag?.id ?? null);
  }

  const onSubmitNewTag =async (newTag: NewTagPayload) => {
    if (!tags.some((tag) => tag.name === newTag.name)) {
      const res = await addTagItem(newTag)
      setTags([...tags, res])
    }
  }

  const onDeleteTag =async (id: number) => {
    await deleteTagItem(id);
    setTags((prev) => prev.filter((tag) => tag.id !== id))
  }

  const dispBlog = filterTagId
    ? blogs.filter((blog) => 
      blog.tags.some((tag) => tag.id === filterTagId)
    )
    : blogs;
 
  useEffect(() => {
    const aaa = async () => {
      const blogs = await getBlogItems()
      setBlogs(blogs)
      const tagResponse = await getTagItems();
      setTags(tagResponse)
    }
    aaa()
  }, [])

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid gray',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          p: 2,
          width: '100%',
          height: 80,
          zIndex: 3,
        }}
      >
        <Typography variant="h1">Todo App</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRight: '1px solid gray',
          position: 'fixed',
          height: 'calc(100% - 80px)',
          width: 200,
          zIndex: 2,
          left: 0,
        }}
      >
        <SideNav
          tags={tags}
          onSelectTag={onSelectTag}
          filterTagId={filterTagId}
          onSubmitNewTag={onSubmitNewTag}
          onDeleteTag={onDeleteTag}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 5,
          mt: 10,
        }}
      >
        <Box maxWidth={700} width="100%">
          <Stack spacing={5}>
            <BlogForm onSubmit={onSubmit} tags={tags} />
            <BlogList
              blogs={dispBlog}
              tags={tags}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </Stack>
        </Box>
      </Box>
    </>
  )
}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,
    },
    h2: {
      fontSize: 20,
    }
  }
})

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
    <BlogApp />
    </ThemeProvider>
  );
}

export default App;