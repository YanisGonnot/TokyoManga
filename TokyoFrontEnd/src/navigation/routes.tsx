import { createBrowserRouter } from "react-router-dom";

import '../main.css'

import HomeScreen from "../Home/ui/Home.tsx";
import MangaInfoScreen from "../mangaInfo/ui/MangaInfoScreen.tsx";
import RootLayout from './RootLayout.tsx';
import Profile from "../auth/ui/profile.tsx";
import AuthByGiacomo from "../auth/ui/authGiacomo.tsx";
import ReviewsScreen from "../reviews/ui/reviews-screen.tsx";



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
                },{
                    path: '/manga/:id/reviews',
                    element: <ReviewsScreen/>
                }
                ,
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
