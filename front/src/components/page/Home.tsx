import { FC } from 'react';
import 'modern-css-reset';
import Header from '../ui/Header';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

type Props = {
}

const Home: FC<Props> = ({  }) => {

    return (
        <>
            <Header />
            <Box sx={{
                marginTop: '100px'
            }}>
                <Link to="/blogs">MY　BLOG</Link>
            </Box>
        </>
    )
}

export default Home;