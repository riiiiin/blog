import { FC } from 'react';
import type { Blog, Tag, UpdateBlogPayload } from '../types/blog';
import { Stack, Typography } from '@mui/material';
import BlogItem from './BlogItem';

type Props = {
    blogs: Blog[];
    tags: Tag[];
    onDelete: (id: number) => void;
    onUpdate: (blog: UpdateBlogPayload) => void;
}

const BlogList: FC<Props> = ({ blogs, tags, onDelete, onUpdate }) => {
    return (
        <Stack spacing={2}>
            <Typography variant="h2">blog list</Typography>
            <Stack spacing={2}>
                {
                    blogs.map((blog) => (
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
    )
}

export default BlogList;