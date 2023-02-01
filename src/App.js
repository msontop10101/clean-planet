import React from 'react'
import Footer from './components/Footer'
import Navigations from './components/Navigations'
import Home from './Home'

const App = () => {
  return (
    <>
      <div>
        <Navigations/>
        <Home/>
        <Footer/>
      </div>
    </>
  )
}

export default App