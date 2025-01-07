import {Link} from "react-router";

export function MainNavigation() {
    return (
        <div className="mainNavigation">
            <Link className="m-2" to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
        </div>
    );
}