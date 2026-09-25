import { useState, type PropsWithChildren } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

const Layout = ({ children }: PropsWithChildren) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='sticky top-0 z-50 w-full'>
        <AnnouncementBar />
        <Navbar onOpenCart={() => setIsCartOpen(true)} />
      </header>

      <main className='flex-1'>{children}</main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Layout;
