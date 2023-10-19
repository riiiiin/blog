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
    tags: Tag[]
}

const BlogItem: FC<Props> = ({ blog, tags }) => {
    const navigate = useNavigate();

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
                </Grid>
            </Grid>
        </Card>
    )
}

export default BlogItem;