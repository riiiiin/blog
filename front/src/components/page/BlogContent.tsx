import { FC, useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Blog } from '../../types/blog';
import { deleteBlogItem, getBlogItem } from '../../lib/api/blog';
import Header from '../ui/Header';

type Props = {
}

const BlogContent: FC<Props> = ({  }) => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState<Blog>();
    const navigate = useNavigate();

    const onUpdate = () => {
        navigate('edit')
    }

    const onDelete = async () => {
        if (!Number(blogId)) return
        await deleteBlogItem(Number(blogId))
        navigate('/blogs')
    }

    useEffect(() => {
        (async() => {
            if (!Number(blogId)) {
                return
            } else {
                const blog = await getBlogItem(Number(blogId))
                setBlog(blog)
            }
        })()
    }, [blogId])

    return (
        <>
            <Header title='BlogContent'>
                <Button onClick={onUpdate}>edit</Button>
                <Button onClick={onDelete}>delete</Button>
            </Header>
            <Stack spacing={1}>
                <Typography variant="caption" fontSize={20}>
                    {blog?.title}
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="caption" fontSize={16}>
                    {blog?.body}
                </Typography>
            </Stack>
        </>
    )
}

export default BlogContent;