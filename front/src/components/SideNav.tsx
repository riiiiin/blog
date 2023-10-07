import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListSubheader,
    Modal,
    Stack,
    TextField,
    Typography,
  } from '@mui/material'
import { Box } from '@mui/system'
import LabelIcon from '@mui/icons-material/Label'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, FC } from 'react'
import { modalInnerStyle } from '../styles/modal'
import { Tag, NewTagPayload } from '../types/blog'

type Props = {
    tags: Tag[],
    filterTagId: number | null,
    onSelectTag: (tag:Tag | null) => void,
    onSubmitNewTag: (newTag: NewTagPayload) => void,
    onDeleteTag: (id: number) => void
}

const SideNav: FC<Props> = ({
    tags,
    filterTagId,
    onSelectTag,
    onSubmitNewTag,
    onDeleteTag
}) => {
    const [editName, setEditName] = useState('');
    const [openTagModal, setOpenTagModal] = useState(false);

    const onSubmit = () => {
        setEditName('');
        onSubmitNewTag({name: editName})
    }

    return(
        <>
            <List>
                <ListSubheader>Tags</ListSubheader>
                {
                    tags.map((tag) => (
                        <ListItem key={tag.id} disablePadding>
                            <ListItemButton onClick={() => onSelectTag(tag.id === filterTagId ? null : tag)} selected={tag.id === filterTagId}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LabelIcon fontSize='small' />
                                    <span>{tag.name}</span>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenTagModal(true)}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <EditIcon fontSize='small' />
                            <span>edit tag</span>
                        </Stack>
                    </ListItemButton>
                </ListItem>
            </List>
            <Modal open={openTagModal} onClose={() => setOpenTagModal(false)}>
                <Box sx={modalInnerStyle}>
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <Typography>new tag</Typography>
                            <TextField
                                label="new tag"
                                variant="filled"
                                fullWidth
                                onChange={(e) => setEditName(e.target.value)}
                            />
                            <Box textAlign="right">
                                <Button onClick={onSubmit}>submit</Button>
                            </Box>
                        </Stack>
                        <Stack spacing={1}>
                            {
                                tags.map((tag) => (
                                    <Stack
                                        key={tag.id}
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <IconButton size='small' onClick={() => onDeleteTag(tag.id)}>
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                        <span>{tag.name}</span>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default SideNav