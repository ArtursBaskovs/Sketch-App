import { Outlet } from "react-router-dom"


//import './index.css';
function Layout() {


  return (
    <>
    <div className="APP_CONTAINER
      flex items-center justify-center flex-col bg-darkerBGColor 
    ">
        <img
          src="/src/assets/images/ui_elements/BG.webp"
          alt="background"
          className="lg:block w-full h-auto object-cover
            fixed lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 
            hidden -z-0
        "/>
        <div className="absolute top-2 right-2 text-white/50 px-3 py-1 rounded">
          <span className="block sm:hidden">base — small phone</span>
          <span className="hidden sm:block md:hidden">sm — smartphone</span>
          <span className="hidden md:block lg:hidden">md — tablet portrait</span>
          <span className="hidden lg:block xl:hidden">lg — laptops 13–14"</span>
          <span className="hidden xl:block 2xl:hidden">xl — laptops 15–16" / large screens</span>
          <span className="hidden 2xl:block">2xl — desktop ≥27"</span>
        </div>

        <Outlet />


    </div>


    </>
  )
}

export default Layout
