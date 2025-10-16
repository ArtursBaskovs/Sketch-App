import { Link } from "react-router-dom"

export const NotFound404: React.FC = () => {
    return (
        <>
        <div className="mt-50">
        <span className="
            absolute py-4 border blur-[70px] bg-amber-100 
            bg-clip-text text-4xl sm:text-6xl 
            font-black text-transparent text-center font-['Chewy'] tracking-widest
        ">404 Page Not Found</span>
        <p className=" 
            font-['Chewy'] tracking-widest font-black text-4xl sm:text-6xl
            py-4 justify-center flex bg-highlightColor bg-clip-text 
            text-transparent text-center
        ">404 Page Not Found</p>
        </div>
        <div className="relative py-20">
            <Link to="/" className="
                text font-['Chewy'] tracking-widest text-amber-100 text-3xl
                hover:text-amber-50 animate-pulse
            ">{"<"} Home</Link>
        </div>
        
        </>
    )
}