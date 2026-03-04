import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 px-10 py-[95px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;