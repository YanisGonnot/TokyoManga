import { createBrowserRouter } from "react-router-dom";

import '../main.css'

import HomeScreen from "../Home/Home.tsx";
import MangaInfoScreen from "../mangaInfo/MangaInfoScreen";
import RootLayout from './RootLayout.tsx';
import Profile from "../auth/ui/profile.tsx";
import AuthByGiacomo from "../auth/ui/authGiacomo.tsx";



const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootLayout />,
            children:[
                {
                    index: true,
                    element: <HomeScreen/>
                },
                {
                    path: '/manga/:id',
                    element: <MangaInfoScreen/>
                },
                {
                    path:'/On_Screen',
                    element: 
                    <div className='wrapperBackgroundShadow'>
                        <h1> On Screen </h1>  
                    </div>
                },
                {
                    path:'/Top_Mangas',
                    element:    
                    <div className='wrapperBackgroundShadow'>
                        <h1> Top Mangas </h1>  
                    </div>
                },
                {
                    path:'page/:pageId',
                    element:<HomeScreen/>
                },{
                    path:'/auth',
                    element: <AuthByGiacomo/>
                },{
                    path:'/profile',
                    element: <Profile/>
                }
            ]
        }
        
    ]
)


export default router
