import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from "./Components/Header.jsx";
import store from "../src/DataStore/store.jsx";
import {Provider} from "react-redux";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import SidePanel from "./Components/SidePanel.jsx";
import {HistoryComponent} from "./Components/ToDoItem/HistoryComponent.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <Header>
                    <SidePanel>
                        <HistoryComponent/>
                    </SidePanel>
                </Header>
                <App/>
                
            </Provider>
        </ErrorBoundary>
    </StrictMode>
)
