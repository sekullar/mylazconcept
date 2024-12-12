import { createContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

const DataProvider = ({children}) => {
    const [usernameSwap,setUsernameSwap] = useState("");
    const [userRoleSwap,setUserRoleSwap] = useState(null);
    const [userMailSwap,setUserMailSwap] = useState("");

    useEffect(() => {
        console.log("coming context usernameswap", usernameSwap)
    }, [usernameSwap])

    return(
        <UserInfoContext.Provider value={{usernameSwap,userRoleSwap,userMailSwap,setUsernameSwap,setUserRoleSwap,setUserMailSwap}}>
            {children}
        </UserInfoContext.Provider>
    )
}



export {DataProvider, UserInfoContext}