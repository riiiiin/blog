import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
    children?: React.ReactNode;
    title: string;
}

const Header: FC<Props> = ({ children, title }) => {
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                top: 0,
                p: 2,
                width: '100%',
                height: 80,
                zIndex: 3,
                }}
            >
                <Typography variant="h1">{title}</Typography>
                <Box 
                    sx={{
                        display: 'flex',

                    }}
                >
                    {children}
                    <Button onClick={() => navigate('/post')}>
                        add blog
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Header;