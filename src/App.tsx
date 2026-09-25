import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:slug' element={<ProductPage />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
