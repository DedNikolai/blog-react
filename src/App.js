import Container from "@mui/material/Container";
import {Routes, Route} from 'react-router-dom';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import NotFound from "./pages/NotFound/404";
import EditPost from "./pages/EditPost/EditPost";
import ProtectedRouter from "./components/ProtectedRoute/ProtectedRoute";
import {useEffect, useContext} from 'react';
import {AuthContext} from './components/AuthProvider/AuthProvider';
import {getCurrentUser} from './api/user';
import Verify from "./pages/Verify";

function App() {
  const {setUser, setUserLoading} = useContext(AuthContext);
  
  useEffect(() => {
    getCurrentUser().then(res =>{
       setUser(res);
       setUserLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route 
              path="/posts/:id/edit" 
              element={<ProtectedRouter><EditPost /></ProtectedRouter>} />
            <Route path="/posts/create" element={<ProtectedRouter><AddPost /></ProtectedRouter>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/auth/verify/:id" element={<Verify />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
