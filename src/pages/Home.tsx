import { useState } from "react";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Medicube from "../components/home/Medicube";
import Sadoer from "../components/home/Sadoer";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import OrderForm from "../components/home/OrderForm";
import ScrollToTop from "../components/home/ScrollToTop";
import WhyChooseUs from "../components/home/WhyChooseUs";

const Home = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    // Smoothly scroll down to the order form
    const orderSection = document.getElementById("order");
    orderSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <Hero />
      <FeaturedProducts onSelectProduct={handleSelectProduct} />
      <Medicube onSelectProduct={handleSelectProduct} />
      <Sadoer onSelectProduct={handleSelectProduct} />
      <Testimonials />
      <OrderForm selectedProductId={selectedProductId} />
      <Faq />
      <WhyChooseUs />
      <ScrollToTop />
    </Layout>
  );
};

export default Home;