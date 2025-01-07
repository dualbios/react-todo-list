import {BrowserRouter, Routes, Route} from "react-router";
import {Outlet} from "react-router";
import {MainNavigation} from "./MainNavigation.jsx";



export function RootLayout() {
    return (
        <>
            <MainNavigation/>
            <Outlet/>
        </>
    );
}