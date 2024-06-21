import { RouterProvider } from "react-router-dom";
import router from "../router";
import ThemeContext from "../context";
import { useState } from "react";

export default function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{
      theme: theme,
      setTheme: setTheme,
      themes: {
          dark: {
              bg: 'bg-slate-700',
              card: 'bg-slate-100',
              text: 'text-slate-600',
              border: 'border-white'
          },
          light: {
              bg: 'bg-gray-100',
              card: 'bg-slate-700',
              text: 'text-slate-100',
              border: 'border-slate-900'
          }
      }
    }}>
      <RouterProvider router={router}>

      </RouterProvider>
    </ThemeContext.Provider>
  )
}
