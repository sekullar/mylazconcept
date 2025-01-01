import Logo from "../images/logo2.png"

const Footer = () => {
    return(
        <>
            <div className="w-full h-[2px] bg-slate-200 mt-28 mb-5">

            </div>
            <div className="flex justify-around sm:flex-row flex-col sm:items-start items-center sm:gap-0 gap-4">
                <img src={Logo} className="w-[200px]" alt="Mylazconcept logo" />
                <ul className="flex flex-col sm:items-start items-center">
                    <p className="inter-600 text-xl">Sosyal medya hesaplarımız</p>
                    <li>
                        <a href="#">Instagram</a>
                    </li>
                    <li>
                        <a href="#">Facebook</a>
                    </li>  
                </ul>
                <ul className="flex flex-col sm:items-start items-center">
                    <p className="inter-500 text-xl">İletişim adreslerimiz</p>
                    <li>
                        <a href="#">+90 555 555 55 55</a>
                    </li>
                    <li>
                        <a href="#">WhatsApp üzerinden sohbet edin</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Footer