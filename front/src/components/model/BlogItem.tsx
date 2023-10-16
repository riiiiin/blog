import { FC, useEffect, useState } from "react";
import type { Blog, Tag, UpdateBlogPayload } from "../../types/blog";
import {
    Typography,
    Button,
    Card,
    Grid,
    Modal,
    Stack,
    Box,
    TextField,
    Chip,
    Checkbox,
    FormControlLabel,
  } from '@mui/material'
  import { modalInnerStyle } from '../../styles/modal'
  import { toggleTags } from "../../lib/toggleTags";
import { useNavigate } from "react-router-dom";

type Props = {
    blog: Blog;
    onUpdate: (blog: UpdateBlogPayload) => void;
    onDelete: (id: number) => void;
    tags: Tag[]
}

const BlogItem: FC<Props> = ({ blog, onDelete, onUpdate, tags }) => {
    const [editing, setEditing] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const [editTags, setEditTags] = useState<Tag[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        setEditBody(blog.body)
        setEditTitle(blog.title)
        setEditTags(blog.tags)
    }, [blog])

    const onCloseEditModal = () => {
        onUpdate({
            id: blog.id,
            title: editTitle,
            body: editBody,
            tags: editTags.map((tag) => tag.id)
        })
        setEditing(false)
    }

    const handleDelete = () => onDelete(blog.id)

    const handleClick = () => {
        navigate(`/blogs/${blog.id}`)
    }

    return(
        <Card sx={{p:1}}>
            <Grid container spacing={2} alignItems="center" onClick={handleClick}>
                <Grid item xs={1}>
                    <Grid item xs={9}>
                        <Stack spacing={1}>
                            <Typography variant="caption" fontSize={20}>
                                {blog.title}
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="caption" fontSize={16}>
                                {blog.body}
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction="row" spacing={1}>
                                {
                                    blog.tags?.map((tag) => (
                                        <Chip key={tag.id} label={tag.name} size="small" />
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack direction="row" spacing={1}>
                        <Button onClick={() => setEditing(true)} color="info">
                            edit
                        </Button>
                        <Button onClick={handleDelete} color="error">
                            delete
                        </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Modal open={editing} onClose={onCloseEditModal}>
                    <Box sx={modalInnerStyle}>
                        <Stack spacing={2}>
                            <TextField
                                size="small"
                                label="todo title"
                                defaultValue={blog.title}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </Stack>
                        <Stack spacing={2}>
                            <TextField
                                size="small"
                                label="todo body"
                                defaultValue={blog.body}
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
                                            <Checkbox defaultChecked={blog.tags.some((blogTag) => blogTag.id === tag.id)} />
                                        }
                                        label={tag.name}
                                        onChange={() => setEditTags((prev) => toggleTags(prev, tag))}
                                    />
                                ))
                            }
                        </Stack>
                    </Box>
                </Modal>
            </Grid>
        </Card>
    )
}

export default BlogItem;