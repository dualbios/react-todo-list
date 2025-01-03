import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <header className="fs-1">
            ToDo list
        </header>
        <App/>
    </StrictMode>,
)
