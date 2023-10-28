import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({ username: '', email: '' });
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);
    return (
        <DataContext.Provider value={{
            account,
            setAccount,
            isUserAuthenticated,
            setUserAuthenticated
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;