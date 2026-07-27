// import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Medicube from "../components/home/Medicube";
import Sadoer from "../components/home/Sadoer";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import OrderForm  from "../components/home/OrderForm";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/home/ScrollToTop";
import WhyChooseUs from "../components/home/WhyChooseUs";
const Home = () => {
    return(
        <>
        <Navbar/>
        <Hero/>
        <FeaturedProducts/>
        <Medicube/>
        <Sadoer/>
        <Testimonials/>
        <OrderForm/>
        <Faq/>
        <WhyChooseUs/>
        <Footer/>
        <ScrollToTop/>
        </>
    );
};
export default Home;