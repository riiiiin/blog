import { FC, useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import Header from '../ui/Header';
import { Blog, Tag } from '../../types/blog';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlogItem, getBlogItem, updateBlogItem } from '../../lib/api/blog';
import { getTagItems } from '../../lib/api/tag';
import { toggleTags } from '../../lib/toggleTags';

type Props = {
}

const BlogEdit: FC<Props> = ({  }) => {
    const [blog, setBlog] = useState<Blog>();
    const [tags, setTag] = useState<Tag[]>([]);
    const [editTitle, setEditTitle] = useState(blog?.title)
    const [editBody, setEditBody] = useState(blog?.body)
    const [editTags, setEditTags] = useState<Tag[]>([])
    const navigate = useNavigate();
    const { blogId } = useParams();

    const onUpdate =async () => {
        await updateBlogItem({
            id: Number(blogId),
            title: editTitle,
            body: editBody,
            tags: editTags.map((tag) => tag.id)
        })
        const blog = await getBlogItem(Number(blogId))
        setBlog(blog)
        setEditTitle(blog.title)
        setEditBody(blog.body)
        setEditTags(blog.tags)
        navigate('/blogs')
    }

    const onDelete = async () => {
        if (!Number(blogId)) return
        await deleteBlogItem(Number(blogId))
        navigate('/blogs')
    } 

    useEffect(() => {
        (async () => {
            if (!Number(blogId)) return
            const blog = await getBlogItem(Number(blogId))
            setBlog(blog)
            setEditTitle(blog.title)
            setEditBody(blog.body)
            setEditTags(blog.tags)

            const tags = await getTagItems();
            setTag(tags)
        })()
    }, [blogId])

    return (
        <>
            <Header title='blogEdit'>
                <Button onClick={onUpdate}>保存</Button>
                <Button onClick={onDelete}>削除</Button>
            </Header>
            <Box>
                <Stack spacing={2}>
                    <TextField
                        size="small"
                        value={editTitle ? editTitle : ''}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                </Stack>
                <Stack spacing={2}>
                    <TextField
                        size="small"
                        value={editBody ? editBody : ''}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                </Stack>
                <Stack>
                    <Typography variant="subtitle1" fontSize={16}>
                        Tags
                    </Typography>
                    {
                        tags.map((tag) => (
                            <FormControlLabel
                                key={tag.id}
                                control={
                                    <Checkbox checked={editTags.some((blogTag) => blogTag.id === tag.id)} />
                                }
                                label={tag.name}
                                onChange={() => setEditTags((prev) => toggleTags(prev, tag))}
                            />
                        ))
                    }
                </Stack>
            </Box>
        </>
    )
}

export default BlogEdit;