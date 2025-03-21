import React, {createContext, useState, useEffect, useContext, Children} from "react";

const lightTheme = {
    background: "#ffffff",
    textColor: "#000000",
    buttonBackground: "#007bff",
    buttonText: "#ffffff",
}

const darkTheme = {
    background: "#121212",
    textColor: "#ffffff",
    buttonBackground: "#444",
    buttonText: "#ffffff",
}

const ThemeContext = createContext();

export const ThemeProvider = ({Children}) => {
    const [theme, setTheme] = useState(
        
    );
} 


