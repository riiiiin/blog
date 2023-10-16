import { FC } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
}

const NotFound: FC<Props> = ({  }) => {
    return (
        <>
            <Box
                sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                p: 2,
                width: '100%',
                height: 100,
                zIndex: 3,
                }}
            >
                <Typography variant="h1">Not Found</Typography>
            </Box>
        </>
    )
}

export default NotFound;