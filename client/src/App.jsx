import Sidebar from './components/Sidebar'
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode((prevState) => !prevState)
  }

  return (
    <section
      className={`h-screen flex flex-col items-center ${
        darkMode ? 'dark' : 'bg-white'
      }`}
    >
      <Sidebar darkMode={darkMode} toggleTheme={toggleTheme} />
    </section>
  )
}

export default App
