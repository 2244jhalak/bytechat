"use client"
import React, { useEffect, useState } from 'react';
import { GiMagicHat } from "react-icons/gi";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { GoHome, GoHistory } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { MdDarkMode } from "react-icons/md";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbPremiumRights } from "react-icons/tb";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

const DashboardHome = () => {
    const [show, setShow] = useState(false);
    const [isDark,setIsDark] = useState(false);
    // Dark mode effect
    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        }
      }, []);
    
      const toggleTheme = () => {
        if (isDark) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }
        setIsDark(!isDark);
      };
    return (
        <div className={`${isDark?"h-screen bg-gray-900 text-white p-5 flex flex-row space-x-2":"h-screen bg-[#F7F5F4] p-5 flex flex-row space-x-2"}`}>
            {/* Sidebar */}
            <div className={`${show?"hidden duration-1000":"w-1/5 duration-1000 flex flex-col justify-between h-full"}`}>
                {/* Top Section */}
                <div>
                    {/* Logo & Sidebar Toggle */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <GiMagicHat className='text-xl'/>
                            <h2 className='text-xl'>ByteChat</h2>
                        </div>
                    </div>

                    {/* Buttons */}
                    <button className={`${isDark?"bg-black cursor-pointer flex items-center justify-between w-full py-2 px-3 my-5 rounded-lg":"bg-white cursor-pointer flex items-center justify-between w-full py-2 px-3 my-5 rounded-lg"}`}>
                        <p>New Chat</p>
                        <IoIosAdd className='text-xl'/>
                    </button>
                    <button className={`${isDark?"bg-black cursor-pointer flex items-center space-x-2 w-full py-2 px-3 my-5 rounded-lg":"bg-white  flex items-center space-x-2 cursor-pointer w-full py-2 px-3 my-5 rounded-lg"}`}>
                        <GoHome className='text-lg'/>
                        <p className='text-sm'>Home</p>
                    </button>
                    <button className={`${isDark?"bg-black cursor-pointer  flex items-center space-x-2 w-full py-2 px-3 my-5 rounded-lg":"bg-white  flex items-center space-x-2 cursor-pointer w-full py-2 px-3 my-5 rounded-lg"}`}>
                        <GoHistory className='text-lg'/>
                        <p className='text-sm'>History</p>
                    </button>
                </div>

                {/* Bottom Profile & Dark Mode */}
                <div className='flex items-center justify-between p-3 rounded-lg mt-auto'>
                    <CgProfile className='text-xl'/>
                    <p className='duration-1000' onClick={toggleTheme}>
                            {
                                isDark? <CiLight className='duration-1000 text-xl cursor-pointer'/> : <MdDarkMode className='duration-1000 text-xl cursor-pointer'/>
                            }
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className={`${show?`w-full duration-1000 ${isDark?"bg-black":"bg-white"} px-20 py-10 rounded-lg flex flex-col justify-between`:`w-4/5 duration-1000 ${isDark?"bg-black":"bg-white"} px-20 py-10 rounded-lg flex flex-col justify-between`}`}>
                
                <div>
                <div className='mb-5 flex flex-row items-center justify-between'>
                    <div>
                    <p className='' onClick={()=>setShow(!show)}>
                            {
                                show? <TbLayoutSidebarLeftExpand className='text-xl cursor-pointer'/> : <IoMdClose className='text-xl cursor-pointer'/>
                            }
                        </p>
                    </div>
                    <div className='flex flex-row space-x-2 cursor-pointer'>
                        <CiShare2 className='text-xl'/>
                        <p>Share</p>
                    </div>
                </div>
                <div>
                <p className="text-3xl">Hello, Samatibura</p>
                <p className="text-3xl text-[#9BA9A6]">How can I help you today</p>         
                </div>
                <div className='grid grid-cols-2 gap-3 mt-5'>
                    <div className={`${isDark?"h-28 bg-linear-to-r rounded-lg from-gray-900 to-gray-700 p-3 flex flex-col":"h-28 bg-linear-to-r rounded-lg from-[#F1F0F5] to-[#F6EFED] p-3 flex flex-col"}`}>
                        <div className={`${isDark?"bg-black":"bg-white"} w-8 h-8 relative rounded-lg`}>
                        <HiOutlineTemplate className='text-xl absolute top-[6px] left-1.5'/>
                        </div>
                        <p className='mt-auto'>Themes</p>
                    </div>
                    <div className={`${isDark?"h-28 bg-linear-to-r rounded-lg from-gray-900 to-gray-700 p-3 flex flex-col":"h-28 bg-linear-to-r rounded-lg from-[#F1F0F5] to-[#F6EFED] p-3 flex flex-col"}`}>
                    <div className={`${isDark?"bg-black":"bg-white"} w-8 h-8 relative rounded-lg`}>
                        <TbPremiumRights className='text-xl absolute top-[6px] left-1.5'/>
                        </div>
                        <p className='mt-auto'>Upgrade to pro</p>
                    </div>
                    
                </div>
                </div>
                <div>
                    <form>
                        <div className={`${isDark?"bg-gray-900":"bg-[#F7F5F4]"} h-10 mt-auto rounded-lg flex flex-row items-center justify-between px-3`}>
                            <div className='w-3/5'>
                            <input className={`${isDark?"text-white":"text-black"} w-full h-full  outline-none border-none`} type="text" name="text" placeholder='Ask anything from ByteChat' />
                            </div>
                            <div className='flex flex-row items-center space-x-2'>
                             <div>
                             <input 
                                type="file" 
                                id="fileUpload" 
                                className="hidden" 
                             />

                             {/* Upload Button */}
                             <label 
                                 htmlFor="fileUpload" 
                                 className="ml-2 px-3 py-1 rounded-lg text-sm cursor-pointer"
                             >
                                 <GoPaperclip className='text-xl' />
                             </label>
                             </div>
                             <div>
                             <MdOutlineKeyboardVoice className='text-xl cursor-pointer' />
                             </div>
                             <div>
                             <button className='bg-[#125C55] text-white px-4 rounded-lg cursor-pointer py-1'>Ask</button>
                             </div>
                            </div>
                             
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
