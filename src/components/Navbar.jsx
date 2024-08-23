
function Navbar() {
    return (
        <div>
            <nav className="flex justify-between bg-slate-700 text-white py-3">
                <div className="logo"><span className="font-bold text-xl mx-10">
                    TASK MANAGER
                </span></div>
                <ul className="flex gap-8 mx-9">
                    <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                    <li className="cursor-pointer hover:font-bold transition-all">About</li>
                    <li className="cursor-pointer hover:font-bold transition-all">Contact</li>
                    <li className="cursor-pointer hover:font-bold transition-all">Services</li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar;
