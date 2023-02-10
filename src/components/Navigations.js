import React, { useState } from 'react'
import { ImMenu } from 'react-icons/im'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import logo from '../assets/cpelogo.png'


const Navigations = () => {
    const [sidebar, setSidebar] = useState(false)
    return (
        <>
            <nav className='flex md:hidden justify-between items-center p-4 bg-[black] sticky top-0 z-10'>
                <div><ImMenu size='2rem' color='white' onClick={() => setSidebar(true)}/></div>
                <div><img src={logo} width={50} height={50} alt="logo"/></div>
            </nav>
            {
                sidebar &&
                <div class='bg-[black] w-[70%] h-[100vh] z-20 fixed top-0 p-6 flex md:hidden flex-col gap-6 justify-between'>
                    <div class='flex flex-col gap-6 pb-4' style={{ borderBottom: '1px solid gray' }}>
                        <div class='flex justify-end' onClick={() => setSidebar(!sidebar)}><ImMenu size='2rem' color='white' onClick={() => setSidebar(false)}/></div>
                        <div class='text-white font-bold text-lg flex items-center justify-between'><p>Add chat</p><AiOutlinePlusSquare size='2rem'/></div>
                        <div>
                            <p class='text-white font-bold text-lg'>Chats:</p>
                        </div>
                    </div>
                    <div class='flex flex-col gap-10 pt-4' style={{ borderTop: '1px solid gray' }}>
                        
                        <div class='flex justify-between'>
                            <li>
                                <div>logout</div>
                            </li>
                            <div>
                                <li>
                                    <div class='bg-black flex items-center'>
                                    <img src={logo} width={50} height={50} alt="logo"/>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Navigations