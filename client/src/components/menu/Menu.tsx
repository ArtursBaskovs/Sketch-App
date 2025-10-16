import { Link } from "react-router-dom"

export const Menu: React.FC = () => {
    return (
        <>
        <div className="MENU_CONTAINER z-1
          lg:pt-20 
          container md:max-w-170 lg:max-w-200 xl:max-w-280 2xl:max-w-350  
          flex items-center 
        ">

          <div className="MENU 
            flex flex-col items-center mx-auto 
            container md:max-w-140 lg:max-w-160 xl:max-w-170 
            pt-10 pb-10 rounded-2xl
            bg-darkBGColor bg-blurAround">

            <div className="MENU_TITLES 
              flex flex-col items-center justify-center gap-3.5 
              h-30 p-10 sm:p-20
              bg-brushStroke drop-shadow-xl drop-shadow-black
            ">
              <h1 className=" text-amber-100 scss-text-style-title
                text-6xl md:text-6xl xl:text-7xl font-black uppercase text-center
                scss-text-style-title font-['Chewy'] tracking-widest sm:[letter-spacing:0.15em]
                drop-shadow-md drop-shadow-black text-stroke
              ">Sketch App</h1>
              <h2 className="
                text-amber-100 font-black text-center text-2xl uppercase 
                scss-text-style-title font-['Chewy'] tracking-widest
                drop-shadow-md drop-shadow-black
                ">Drawing modes</h2>
            </div>
            <div className="BUTTON_CONTAINER flex flex-col items-center justify-center mt-18 gap-3
              font-['Chewy'] tracking-widest sm:[letter-spacing:0.2rem] text-amber-950  
              drop-shadow-xl drop-shadow-black
            ">
                <Link to='/draw'>
                    <button className="menu-btn btn-speedSketch">
                        <p> Speed Sketch</p>
                    </button>
                </Link>

                <button className="menu-btn btn-oneLine">
                    <p>One Line</p>
                </button>
                <button className="menu-btn btn-memoryReference">
                    <p>Memory Reference</p>
                </button>
                <button className="menu-btn btn-randomPrompt">
                    <p>Random Prompt</p>
                </button>
                <button className="menu-btn btn-limitedStrokes">
                    <p>Limited Strokes</p>
                </button>
            </div>
          </div>
        </div>

        </>
    )
}