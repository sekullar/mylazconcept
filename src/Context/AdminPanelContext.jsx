import { createContext, useEffect, useState } from "react";

const AdminPanelContext = createContext();

const DataProviderAdmin = ({children}) => {
    const [modalOpen,setModalOpen] = useState(false);
    const [pageValue,setPageValue] = useState("");

    return(
        <AdminPanelContext.Provider value={{modalOpen, pageValue ,setModalOpen,setPageValue}}>
            {children}
        </AdminPanelContext.Provider>
    )
}



export {DataProviderAdmin, AdminPanelContext}