import { FC, useState } from 'react';
import { NewBlogPayload, Tag } from '../../types/blog';
import { Box, Button, TextField, Paper, Grid, FormControlLabel, Stack, Modal, Chip, Checkbox } from '@mui/material';
import { modalInnerStyle } from '../../styles/modal';
import { toggleTags } from '../../lib/toggleTags';

type Props = {
    onSubmit: (newBlog: NewBlogPayload) => void,
    tags: Tag[],
}

const BlogForm: FC<Props> = ({onSubmit, tags}) => {
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const [editTags, setEditTags] = useState<Tag[]>([])
    const [openTagModal, setOpenTagModal] = useState(false)

    const addBlogHandler = async () => {
        if (!editBody || !editTitle) return;

        onSubmit({
            title: editTitle,
            body: editBody,
            tags: editTags.map((tag) => tag.id)
        })
        setEditBody('')
        setEditTitle('')
    }

    return (
        <Paper elevation={2}>
            <Box sx={{p:2}}>
                <Grid container rowSpacing={2} columnSpacing={5}>
                    <Grid item xs={12}>
                        <TextField
                            label="new todo title"
                            variant="filled"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="new todo body"
                            variant="filled"
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1}>
                            {
                                editTags.map((tag) => (
                                    <Chip key={tag.id} label={tag.name} />
                                ))
                            }
                        </Stack>
                    </Grid>
                    <Grid item xs={3} xl={7}>
                        <Button
                            onClick={() => setOpenTagModal(true)}
                            fullWidth
                            color="secondary"
                        >
                            select tag
                        </Button>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={3}>
                        <Button onClick={addBlogHandler} fullWidth>
                        add blog
                        </Button>
                    </Grid>
                    <Modal open={openTagModal} onClose={() => setOpenTagModal(false)}>
                        <Box sx={modalInnerStyle}>
                            <Stack>
                                {
                                    tags.map((tag) => (
                                        <FormControlLabel
                                            key={tag.id}
                                            control = {<Checkbox checked={editTags.includes(tag)} />}
                                            label={tag.name}
                                            onChange={() => setEditTags((prev) => toggleTags(prev, tag))}
                                        />
                                    ))
                                }
                            </Stack>
                        </Box>
                    </Modal>
                </Grid>
            </Box>
        </Paper>
    )
}

export default BlogForm;