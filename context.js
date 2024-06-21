import { createContext } from "react";

// const ThemeContext = createContext('light')
const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    themes: {
        dark: {
            bg: 'bg-slate-700'
        },
        light: {
            bg: 'bg-gray-100'
        }
    }
})



export default ThemeContext