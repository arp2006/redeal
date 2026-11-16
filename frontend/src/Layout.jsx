import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
