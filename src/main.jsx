import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from "./Components/Header.jsx";
import store from "../src/DataStore/store.jsx";
import {Provider} from "react-redux";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <Header/>
                <App/>
            </Provider>
        </ErrorBoundary>
    </StrictMode>
)
