import { Outlet } from "react-router-dom"
import TopBar from "../TopBar/TopBar"
import { NAV_HEIGHT } from "../utils/constantes"




const RootLayout = () => {
    return (
        <div className="mainWrapper" style={{paddingTop:NAV_HEIGHT, position:'relative'}}>
            <TopBar />

            <main>
                <Outlet/>
            </main>

        </div>
    )
}

export default RootLayout