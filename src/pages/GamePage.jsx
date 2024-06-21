import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import WordComponent from "../components/WordComponent";
import socket from "../socket";
import instance from "../axiosInstance";
import ThemeContext from "../../context";
import { Link } from "react-router-dom";

export default function GamePage() {
  const {theme, setTheme, themes} = useContext(ThemeContext);
  const activeTHeme = themes[theme]
  console.log(activeTHeme, 'activ thme');
  // 
  const [users, setUsers] = useState([]);

  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");

  async function getClue() {
    try {
      const { data } = await instance.get("/word");
      console.log(data);
      setClue(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }
  console.log(clue, "<-");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };

    socket.disconnect().connect();
  }, []);

  useEffect(() => {
    socket.on("users:online", (newUsers) => {
      setUsers(newUsers);
    });

    return () => {
      socket.off("users:online");
    };
  }, []);

  useEffect(() => {
    getClue();
  }, []);
  return (
    <>
      <>
        <nav className="bg-gray-50 dark:bg-slate-800">
          <div className="max-w-screen-xl px-4 py-3 mx-auto flex justify-between">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-gray-900 text-2xl dark:text-white hover:underline"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-slate-900 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }}
                  >
                    {theme == 'dark' ? <MdOutlineDarkMode className="text-2xl" /> : <MdOutlineLightMode className="text-2xl" />}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>

      {/* container */}
      <div className={`container-100 h-screen flex flex-col items-center justify-center ${activeTHeme.bg}`}>
        {/* clue */}

        <div className="container-sm bg-slate-500 mb-5 rounded-md">
          <h1 className="mb-5 text-2xl text-white w-46 px-2 inline">
            clue: {clue.hint}
          </h1>
        </div>
        {/* end clue */}

        {/* Word Component */}
        <WordComponent clue={clue} />
        {/* end WOrd Component */}

        {/* form */}
        <form
          className="flex items-center justify-center w-screen gap-2 h-48 mb-10"
          onSubmit={handleSubmit}
        >
          <button
            type="submit"
            onClick={() => {}}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-3xl w-96 sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
          >
            A
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-3xl w-96 sm:w-auto px-10 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-md"
          >
            M
          </button>
        </form>
        {/* end form */}

        <div className="guest flex justify-evenly w-screen px-5">
          {users.map((el, i) => {
            return (
              <div key={i}>
                <h1 className={`text-3xl ${activeTHeme.text} ${activeTHeme.card} px-2 py-2 rounded-md`}>
                  {el.username}: {0}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      {/* end container */}
    </>
  );
}
