import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:slug' element={<ProductPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
