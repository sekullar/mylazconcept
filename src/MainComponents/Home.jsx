import PhotoTemplate from "../images/templatephoto.png"
import Slider from "react-slick";
import Resim1 from "../images/RESİM 1.jpg"
import Resim2 from "../images/RESİM 2.jpg"
import Resim3 from "../images/RESİM 3.jpg"
import OyuncakBanner from "../images/Oyuncaklar.png"
import HediyelikEsyaBanner from "../images/HediyelikEsya.png"
import MagnetBanner from "../images/Magnet.png"
import "../css/home.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductForwardContext } from "../Context/ProductForwardContext";


const Home = () => {

    const navigate = useNavigate();

    const {categoryForward,setCategoryForward} = useContext(ProductForwardContext);

    var settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return(
        <>
            {/* <div className="flex justify-center w-full flex-wrap">
                <div className="lg:w-1/3 sm:w-1/2 w-full  flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                <div className="lg:w-1/3 sm:w-1/2 w-full flex justify-center max-h-64">
                    <img src={PhotoTemplate} className="h-full object-contain" alt="Product Photo" />
                </div>
                
            </div> */}
            
            <Slider {...settings}>
                <div className="flex-important justify-center">
                    <img src={Resim1} className="max-h-[500px]" alt="Ön resim" />
                </div>
                <div className="flex-important justify-center">
                    <img src={Resim2} className="max-h-[500px]" alt="Ön resim" />
                </div>
                <div className="flex-important justify-center ">
                    <img src={Resim3} className="max-h-[500px]" alt="Ön resim" />
                </div>
            </Slider>
            <div className="flex justify-center items-center gap-5 flex-col">
                <img src={HediyelikEsyaBanner} className="rounded-3xl" onClick={() => {setCategoryForward("gift"); navigate("/productShow")}} alt="Hediyelik Eşya Ürünleri" />
                <img src={MagnetBanner} className="rounded-3xl" onClick={() => {setCategoryForward("magnet"); navigate("/productShow")}} alt="Magnet ürünleri" />
                <img src={OyuncakBanner} className="rounded-3xl" onClick={() => {setCategoryForward("toys"); navigate("/productShow")}} alt="Oyuncak ürünleri" />
            </div>
            
        </>
    )
}

export default Home 