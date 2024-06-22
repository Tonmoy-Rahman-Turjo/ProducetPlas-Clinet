import About from "./About/About";
import Banar from "./Bannar/Banar";
import Fetechard from "./Futechard/Fetechard";
import Testimonials from "./Testimonials/Testimonials";
import TrandingProducts from "./TrandingProducts/TrandingProducts";


const Home = () => {
    return (
        <div>
        <Banar></Banar>
        <Fetechard></Fetechard>
        <About></About>
        <TrandingProducts></TrandingProducts>
        <Testimonials></Testimonials>
        </div>
    );
};

export default Home;