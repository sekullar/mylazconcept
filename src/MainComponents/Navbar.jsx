import Down from "../images/down.svg"

const Navbar = () => {
    return(
        <>
            <div className="flex items-center border-y-1 ms-4 gap-5">
                <a href="#" className="flex items-center gap-2">Anasayfa <img src={Down} className="w-[15px]" alt="Down" /></a>
            </div>
        </>
    )
}

export default Navbar