import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import BlogForm from '../model/BlogForm';
import { NewBlogPayload, Tag } from '../../types/blog';
import { addBlogItem } from '../../lib/api/blog';
import { getTagItems } from '../../lib/api/tag';
import { useNavigate } from 'react-router-dom';

type Props = {
}

const Post: FC<Props> = ({  }) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    const onSubmit = async (payload: NewBlogPayload) => {
        if (!payload.body || !payload.title) return;
        await addBlogItem(payload)
        navigate('/blogs')
    }

    useEffect(() => {
        (async () => {
            const tagResponse = await getTagItems();
            setTags(tagResponse)
        })()
    }, [])

    return (
        <>
            <Box
                sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                top: 0,
                p: 2,
                width: '100%',
                height: 80,
                zIndex: 3,
                }}
            >
                <Typography variant="h1">Post</Typography>
            </Box>
            <BlogForm
                onSubmit={onSubmit}
                tags={tags}
            />
        </>
    )
}

export default Post;