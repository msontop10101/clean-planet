import React, { useState } from 'react';
import './App.css'
import { MdSend } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineLogout} from 'react-icons/md'

const Home = () => {

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
    async function handleSubmit(e) {
        e.preventDefault();
        setChatLog((p) => [...p, { user: 'me', message: `${input}` }])
        setInput("")
        const response = await fetch('https://ba40-197-210-76-184.eu.ngrok.io/api/chat', {
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
                <div className='w-[100%] md:w-[70%]' style={{ backgroundColor: '#000040', height: '100vh', position: 'relative' }}>
                    <div className='chatbox absolute bottom-40'>
                        <div className='chat-log px-[20px] md:px-[40px] py-[20px]'>
                            {chatLog.map((message, index) => (
                                <ChatMessage key={index} message={message} />
                            ))}

                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='flex justify-center absolute bottom-10 w-full items-center'>
                        <div className='w-[80%] flex items-center' style={{ border: '2px solid gray', borderRadius: '15px' }}>
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={{ color: 'white', padding: '0px 10px 0px 10px', width: '90%', height: '50px', borderRadius: '10px', outline: 'none', backgroundColor: '#000040' }}
                            />
                            <div class='cursor-pointer'><MdSend color='white' size='1.6rem' /></div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};
const ChatMessage = ({ message }) => {
    return (
        <div className='odd:flex justify-end'>
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