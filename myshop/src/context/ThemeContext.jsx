import React, { createContext, useState } from "react";

// Create a context
export const ThemeContext = createContext();

// Generate Provider
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');
    
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    const themeContextValues = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={themeContextValues}>
            {children}
        </ThemeContext.Provider>
    );

};