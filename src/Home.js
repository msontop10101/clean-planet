import React, { useState, useRef, useEffect } from 'react';
import './App.css'
import { MdSend } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineLogout } from 'react-icons/md'
import logo from './assets/cpelogo.png'

const Home = () => {

    const navbarHeight = '56px'
    const footerHeight = '82px'

    const bottomRef = useRef(null);
    const [input, setInput] = useState('')
    const [chatLog, setChatLog] = useState([
        {
            user: 'me',
            message: 'print out a random lorem ipsum'
        },
        {
            user: 'gpt',
            message: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availabl'
        }

    ])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [chatLog]);
    async function handleSubmit(e) {
        e.preventDefault();
        setChatLog((p) => [...p, { user: 'me', message: `${input}` }])
        setInput("")
        const response = await fetch('https://clean-planet-energy.onrender.com/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: chatLog.map((message) => message.message).join("")
            })
        });
        const data = await response.json()
        setChatLog(p => [...p, { user: "gpt", message: `${data.data.message}` }])
        console.log(data.data)
    }

    return (
        <>
            {/* {!isAuth ? <Navigate to={'/login'} /> : null} */}
            <div className='flex'>
                <div class='w-[30%] hidden md:flex bg-[black] flex-col justify-between'>
                    <div class='p-2'>
                        <div class='p-3 border-2 rounded-md border-[#919191] flex items-center gap-5 cursor-pointer text-white'><FaPlus /><p>New chat</p></div>
                    </div>
                    <div class='px-2 py-6' style={{ borderTop: '2px solid #919191' }}>
                        <ul class='flex flex-col gap-8 chat text-white'>
                            <li class='flex items-center gap-2'><RiDeleteBin6Line size='1.5em' /><p>Clear conversation</p></li>
                            <li class='flex items-center gap-2'><FiExternalLink size='1.5em' /><p>FAQ</p></li>
                            <li class='flex items-center gap-2'><MdOutlineLogout size='1.5em' /><p>logo</p></li>
                        </ul>
                    </div>
                </div>
                <div className='w-full z-30 md:w-[80%] bg-[#000040] relative flex flex-col justify-between py-4' style={{ minHeight: `calc(100vh - ${navbarHeight} - ${footerHeight})` }}>
                    <div class='hidden md:flex justify-center py-4'>
                        <img src={logo} width={50} height={50} alt='logo' />
                    </div>
                    <div className='flex flex-col gap-10 items-center absolute bottom-10 w-full'>
                        <div className='chat-box h-[100%] text-white w-[90%]'>
                            <div className='chat-log justify-center relative' style={{maxHeight: "60vh"}}>
                                <div className='h-full overflow-y-scroll'>
                                {chatLog.map((message, index) => (
                                    <ChatMessage key={index} message={message} />
                                ))}
                                <div ref={bottomRef} />
                            </div>
                                </div>
                        </div>
                        <form onSubmit={handleSubmit} className='flex justify-center w-full items-center'>
                            <div className='w-[80%] flex items-center' style={{ border: '2px solid gray', borderRadius: '15px' }}>
                                <input
                                    type='text'
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    style={{ color: 'white', padding: '0px 10px 0px 10px', width: '90%', height: '50px', borderRadius: '10px', outline: 'none', backgroundColor: '#000040' }}
                                />
                                <div class='cursor-pointer'><button><MdSend color='white' size='1.6rem' /></button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};
const ChatMessage = ({ message }) => {
    return (
        <div className={`${message.user === 'gpt' ? 'flex justify-start my-1 rounded-xl' : 'flex justify-end my-1 rounded-xl'}`}>
            <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
                {/* <div className={`avater ${message.user === 'gpt' && 'chatgpt'}`}> */}
                {message.user === 'gpt' && ''}
                {/* </div> */}
                <div className='message'>{message.message}</div>
            </div>
        </div>
    )
}

export default Home;