import React from "react";

const Navbar = () => {
    return (
        <nav className="justify-between flex bg-slate-900 text-white py-2">
            <div className="logo font-bold text-xl mx-9">TodoX</div>
            <ul className="flex gap-10 mx-9">
                <li className="cursor-pointer hover:font-bold transition-all duration-300">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all duration-300">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar