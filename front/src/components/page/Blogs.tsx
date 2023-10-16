import { useState, FC, useEffect } from 'react';
import 'modern-css-reset';
import { Box, Stack, Typography } from '@mui/material';
import { Blog, Tag, NewTagPayload, UpdateBlogPayload } from '../../types/blog';
import BlogItem from '../model/BlogItem';
import { getBlogItems, updateBlogItem, deleteBlogItem } from '../../lib/api/blog';
import { addTagItem, getTagItems, deleteTagItem } from '../../lib/api/tag';
import SideNav from '../model/SideNav';
import Header from '../ui/Header';


type Props = {
}

const Blogs: FC<Props> = ({  }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [filterTagId, setFilterTagId] = useState<number | null>(null);

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
            <Header title='Blogs'></Header>
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
                    <Stack spacing={2}>
                        <Typography variant="h2">blog list</Typography>
                        <Stack spacing={2}>
                            {
                                dispBlog.map((blog) => (
                                    <BlogItem
                                        key={blog.id}
                                        blog={blog}
                                        tags={tags}
                                        onUpdate={onUpdate}
                                        onDelete={onDelete}
                                    />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
                </Box>
            </Box>

        </>
    )
}

export default Blogs;