"use client";
import React, { useEffect, useState } from 'react';
import { GiMagicHat } from "react-icons/gi";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { GoHome, GoHistory } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const DashboardHome = () => {
    const [show, setShow] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChat, setCurrentChat] = useState(null); // To track the current chat session

    // Dark mode effect
    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }

        // Retrieve the chat history from localStorage
        const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory'));
        if (savedChatHistory) {
            setChatHistory(savedChatHistory);
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

    // Function to send the user input to EchoGPT API
    const sendMessage = async () => {
        if (userInput.trim()) {
            const newHistory = [...chatHistory, { user: userInput, bot: '' }];
            setChatHistory(newHistory);
            setUserInput('');

            try {
                const response = await axios.post(
                    "https://api.echogpt.live/v1/chat/completions",
                    {
                        messages: [{ role: "system", content: "You are a helpful assistant." }],
                        model: "EchoGPT",
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": "echogpt-Uq6gYaBSWJ-qVnoEe45Mv-hA0ZopNkZx-Yv1dS0tTHn-YY1ZLTf3QfLE4K_8VttJJiMF",
                        },
                    }
                );
                console.log(response.data);

                const updatedHistory = [...newHistory];
                updatedHistory[updatedHistory.length - 1].bot = response.data.choices[0].message.content;
                setChatHistory(updatedHistory);

                // Save chat history to localStorage
                localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
            } catch (error) {
                console.error('Error fetching chat response:', error);
            }
        }
    };

    // Function to start a new chat
    const startNewChat = () => {
        setUserInput('');
        setChatHistory([]);
        setCurrentChat(null);

        // Clear chat history from localStorage
        localStorage.removeItem('chatHistory');
    };

    // Function to show the chat history
    const showHistory = () => {
        const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory'));
        if (savedChatHistory) {
            setCurrentChat(savedChatHistory); // Show chat history when clicked
        }
    };

    return (
        <div className={`${isDark ? "h-screen bg-gray-900 text-white p-5 flex flex-row space-x-2" : "h-screen bg-[#F7F5F4] p-5 flex flex-row space-x-2"}`}>
            {/* Sidebar */}
            <div className={`${show ? "hidden duration-1000" : "w-1/5 duration-1000 flex flex-col justify-between h-full"}`}>
                {/* Top Section */}
                <div>
                    {/* Logo & Sidebar Toggle */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <GiMagicHat className='text-xl' />
                            <h2 className='text-xl'>ByteChat</h2>
                        </div>
                    </div>

                    {/* Buttons */}
                    <button onClick={startNewChat} className={`${isDark ? "bg-black cursor-pointer flex items-center justify-between w-full py-2 px-3 my-5 rounded-lg" : "bg-white cursor-pointer flex items-center justify-between w-full py-2 px-3 my-5 rounded-lg"}`}>
                        <p>New Chat</p>
                        <IoIosAdd className='text-xl' />
                    </button>
                    <button className={`${isDark ? "bg-black cursor-pointer flex items-center space-x-2 w-full py-2 px-3 my-5 rounded-lg" : "bg-white flex items-center space-x-2 cursor-pointer w-full py-2 px-3 my-5 rounded-lg"}`}>
                        <GoHome className='text-lg' />
                        <p className='text-sm'>Home</p>
                    </button>
                    <button onClick={showHistory} className={`${isDark ? "bg-black cursor-pointer flex items-center space-x-2 w-full py-2 px-3 my-5 rounded-lg" : "bg-white flex items-center space-x-2 cursor-pointer w-full py-2 px-3 my-5 rounded-lg"}`}>
                        <GoHistory className='text-lg' />
                        <p className='text-sm'>History</p>
                    </button>
                </div>

                {/* Bottom Profile & Dark Mode */}
                <div className='flex items-center justify-between p-3 rounded-lg mt-auto'>
                    <CgProfile className='text-xl' />
                    <p className='duration-1000' onClick={toggleTheme}>
                        {
                            isDark ? <CiLight className='duration-1000 text-xl cursor-pointer' /> : <MdDarkMode className='duration-1000 text-xl cursor-pointer' />
                        }
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className={`${show ? `w-full duration-1000 ${isDark ? "bg-black" : "bg-white"} px-20 py-10 rounded-lg flex flex-col justify-between` : `w-4/5 duration-1000 ${isDark ? "bg-black" : "bg-white"} px-20 py-10 rounded-lg flex flex-col justify-between`}`}>
                {
                    chatHistory.length === 0 ?
                    <div>
                        <div className='mb-5 flex flex-row items-center justify-between'>
                            <div>
                                <p className='' onClick={() => setShow(!show)}>
                                    {
                                        show ? <TbLayoutSidebarLeftExpand className='text-xl cursor-pointer' /> : <IoMdClose className='text-xl cursor-pointer' />
                                    }
                                </p>
                            </div>
                            <div className='flex flex-row space-x-2 cursor-pointer'>
                                <CiShare2 className='text-xl' />
                                <p>Share</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl">Hello, Samatibura</p>
                            <p className="text-3xl text-[#9BA9A6]">How can I help you today?</p>
                        </div>
                    </div>
                    : ""
                }

                {/* Chat Input and History */}
                <div className='flex flex-col justify-between h-screen'>
                    <div className={`${currentChat ? "h-[500px] chat-history overflow-y-auto" : "hidden"}`}>
                        {currentChat && currentChat.map((entry, index) => (
                            <div key={index} className="chat-entry space-y-3">
                                <div className='flex flex-row items-center justify-between'>
                                    <p className='invisible'>royal</p>
                                    <div className="user-message">{entry.user}</div>
                                </div>
                                {entry.bot && <div className="bot-response">{entry.bot}</div>}
                            </div>
                        ))}
                    </div>
                    <form className='mt-auto' onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                        <div className={`${isDark ? "bg-gray-900 mt-auto" : "bg-[#F7F5F4]"} h-10 mt-auto rounded-lg flex flex-row items-center justify-between px-3`}>
                            <div className='w-3/5'>
                                <input 
                                    className={`${isDark ? "text-white" : "text-black"} w-full h-full outline-none border-none`} 
                                    type="text" 
                                    name="text" 
                                    value={userInput} 
                                    onChange={(e) => setUserInput(e.target.value)} 
                                    placeholder='Ask anything from ByteChat' 
                                />
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
                                    <button type="submit" className='bg-[#125C55] text-white px-4 rounded-lg cursor-pointer py-1'>
                                        Ask
                                    </button>
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
