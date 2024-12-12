import Banner from "./Banner"
import Header from "./Header"
import Home from "./Home"
import Navbar from "./Navbar"
import toast, { Toaster } from 'react-hot-toast';


const Main = () => {
    return(
        <>
            <Banner />
            <Header />
            <Navbar />
            <Home />
        </>
    )
}

export default Main