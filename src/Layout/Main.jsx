import { Outlet } from "react-router-dom";
import Nav from "../Shared/NavBar/Nav";
import Footer from "../Pages/Footer/Footer";


const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;