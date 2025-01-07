import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from "./Components/Header.jsx";
import store from "../src/DataStore/store.jsx";
import {Provider} from "react-redux";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import SidePanel from "./Components/SidePanel.jsx";
import {HistoryComponent} from "./Components/HistoryComponent.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router";
import {RootLayout} from "./Components/RootLayout.jsx";
import {About} from "./Components/About.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<RootLayout/>}>
                        <Route path={"/"}
                               element={
                                   <Provider store={store}>
                                       <Header>
                                           <SidePanel>
                                               <HistoryComponent/>
                                           </SidePanel>
                                       </Header>
                                       <App/>
                                   </Provider>
                               }/>
                        <Route path={"/about"} element={<About/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>
)
