import Logo from "../images/logo2.png"
import Bar from "../images/bars.svg"
import { useContext } from "react"
import { AdminPanelContext } from "../Context/AdminPanelContext"

const AdminHeader  = ({ userNameProps}) => {

    const {modalOpen,setModalOpen} = useContext(AdminPanelContext)

    return(
        <>
            <div className="flex justify-between items-center p-3">
                <div className="flex items-center gap-2">
                    <img src={Bar} className="w-[30px] mx-5 cursor-pointer" alt="Menu Bar" onClick={() => setModalOpen(!modalOpen)}/>
                    <img src={Logo} className="w-[90px]" alt="Logo" />
                    <p className="inter-500 text-xl">Hoşgeldiniz, {userNameProps}</p>   
                </div>
                <div className="flex items-center gap-2">
                    
                </div>
            </div>
        </>
    )
}

export default AdminHeader