import { createContext, useEffect, useState } from "react";

const ProductForwardContext = createContext();

const DataProviderProduct = ({children}) => {
    
    const [categoryForward,setCategoryForward] = useState("gift");

    return(
        <ProductForwardContext.Provider value={{categoryForward,setCategoryForward}}>
            {children}
        </ProductForwardContext.Provider>
    )
}



export {DataProviderProduct, ProductForwardContext}