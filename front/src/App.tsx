import { FC } from 'react';
import 'modern-css-reset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './components/page/Home';
import Post from './components/page/Post';
import NotFound from './components/page/NotFound';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/page/Blogs';
import BlogContent from './components/page/BlogContent';
import BlogEdit from './components/page/BlogEdit';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,
    },
    h2: {
      fontSize: 20,
    }
  }
})

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/post" element={<Post />} />
        <Route path="/blogs" element={<Blogs />}/>
        <Route path="/blogs">
          <Route path=":blogId" element={<BlogContent />} />
        </Route>
        <Route path="/blogs">
          <Route path=":blogId">
            <Route path="edit" element={<BlogEdit />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;