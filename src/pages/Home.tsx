// import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Medicube from "../components/home/Medicube";
const Home = () => {
    return(
        <>
        <Navbar/>
        <Hero/>
        <FeaturedProducts/>
        <Medicube/>
        </>
    );
};
export default Home;