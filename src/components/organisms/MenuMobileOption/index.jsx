import { useEffect, useRef } from "react";
import { FcPlus } from "react-icons/fc";
import { IoMdPodium } from "react-icons/io";
import { MdClose, MdHome, MdMenu, MdNotifications } from "react-icons/md";

export default function MenuMobileOption({ handleClickButtonMenu, menuIsOpen }) {
    const refMenu = useRef(null);

    /**
    * It's was add event on document to menu when user is scrolling to bottom 
    * its will hidden and when user scrolling to up it will displayed
    */

    useEffect(() => {
        var currentScroll = 0

        const toggleBottomMenu = () => {
            if (window.scrollY >= currentScroll && refMenu) refMenu.current.classList.add("hidden-menu")
            else refMenu.current.classList.remove("hidden-menu")
            currentScroll = window.scrollY // add current scroll to variable
        }

        document.addEventListener("scroll", toggleBottomMenu)

        return () => document.removeEventListener("scroll", toggleBottomMenu)
    }, [])

    /**
    * Function with objective to change color of div's svg
    * @param {*} currentTarget 
    */
    const changeColorMenu = ({ currentTarget }) => {
        //execute the actions to menu
        handleClickButtonMenu(currentTarget);

        //change color icons
        refMenu.current.querySelectorAll("div > div").forEach(div => {
            div.classList.remove("active-menu")
            div.classList.add("fill-zinc-400")
        });
        currentTarget.classList.remove("fill-zinc-400")
        currentTarget.classList.add("active-menu")
    }

    return (
        <div
            ref={refMenu}
            className="flex md:hidden items-center border-t border-t-black fixed z-[999] bottom-0 left-0 w-full h-[5rem] bg-white p-4"
        >
            <div className="w-full flex justify-around">
                <div
                    className="flex flex-col justify-center items-center active-menu"
                    onClick={changeColorMenu}
                >
                    <MdHome className="text-s3 cursor-pointer fill-inherit" />
                    <span>Home</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center fill-zinc-400"
                    onClick={changeColorMenu}
                >
                    <IoMdPodium className="text-s3 cursor-pointer fill-inherit" />
                    <span className="text-inherit">Ranking</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center fill-zinc-400 relative"
                    onClick={changeColorMenu}
                >
                    <FcPlus className="text-s4 fill-zinc-400 absolute -top-[.5rem] left-1/2 -translate-x-1/2" />
                    <span className="hidden">Create</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center fill-zinc-400"
                    onClick={changeColorMenu}
                >
                    <MdNotifications className="text-s3 cursor-pointer fill-inherit" />
                    <span>Notificações</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center fill-zinc-400"
                    onClick={changeColorMenu}
                >
                    {
                        menuIsOpen ?
                            <MdClose className="text-s3 cursor-pointer fill-inherit" />
                            :
                            <MdMenu className="text-s3 cursor-pointer fill-inherit" />
                    }
                    <span>Menu</span>
                </div>
            </div>
        </div>
    )
}