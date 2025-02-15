import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './components/Products'

function App() {

  return (
    <>
      <nav>

        <div className="logo">
          <h1>LOGO</h1>
        </div>

        <div className="navlinks">

          <li>
            Home
          </li>
          <li>
            Add Products
          </li>


        </div>
      </nav>

      <main>
        <Products />
      </main>

    </>
  )
}

export default App
