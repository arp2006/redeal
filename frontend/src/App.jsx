import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from "./pages/Product";
import Create from "./pages/Create";
import Account from "./pages/Account";
import Success from "./pages/Success";
import Sidebar from './components/layout/Sidebar';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Tos from './pages/Tos';
import RequireAuth from './RequireAuth';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ArchivedPost from './pages/ArchivedPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<><Sidebar /><Home /></>} />
          <Route path="/search" element={<><Sidebar /><Search /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tos" element={<Tos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacypolicy" element={<Privacy />} />
          <Route path="/settings/:page" element={ <SettingsPage /> } />
          <Route path="/edit/:id" element={ <EditPost /> } />
          <Route path="/profile/:id" element={ <Profile /> } />
          <Route element={< RequireAuth />}>
            <Route path="/create" element={<Create />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/account" element={<Account />} />
            <Route path="/success" element={<Success />} />
            <Route path="/archive/:id" element={<ArchivedPost />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
