import Container from "@mui/material/Container";
import {Routes, Route} from 'react-router-dom';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import NotFound from "./pages/NotFound/404";
import ProtectedRouter from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route 
              path="/posts/:id/edit" 
              element={<ProtectedRouter><FullPost /></ProtectedRouter>} />
            <Route path="/posts/create" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
