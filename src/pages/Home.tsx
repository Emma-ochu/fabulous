import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CollectionHighlights from "../components/home/CollectionHighlights";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import ScrollToTop from "../components/home/ScrollToTop";
import WhyChooseUs from "../components/home/WhyChooseUs";
import { getProductById } from "../data/catalog";

const Home = () => {
  const navigate = useNavigate();

  const handleSelectProduct = (productId: string) => {
    const product = getProductById(productId);
    if (!product || product.inStock === false) return;
    navigate(`/products/${product.slug}`);
  };

  return (
    <Layout>
      <Hero />
      <FeaturedProducts onSelectProduct={handleSelectProduct} />
      <CollectionHighlights />
      <Testimonials />
      <Faq />
      <WhyChooseUs />
      <ScrollToTop />
    </Layout>
  );
};

export default Home;
