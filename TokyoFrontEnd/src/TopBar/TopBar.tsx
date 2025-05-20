import { ReactElement } from 'react';
import './TopBar.css'
import { NavLink } from 'react-router-dom';
import { NAV_HEIGHT } from '../utils/constantes';
import profileImg from '../assets/profile.png';

function TopBar() : ReactElement{
    return (
      <nav className='topBar' style={{height:NAV_HEIGHT}}>
        <div className='navBar'>

          <NavLink className='screen' to={`/profile`}> 
            <img src={profileImg}/>
          </NavLink>

          <NavLink className='screen' to={'/auth'}> Register & Login </NavLink>

          <NavLink className='screen' to={'/On_Screen'}>
            On Screen
          </NavLink>

          <NavLink className='screen' to={'/Top_Mangas'}>
            Top Mangas
          </NavLink>
        </div>

        <div className='titleBar'>
          <NavLink className='title' to={'/'}>
            Tokyo Manga
          </NavLink>  
        </div>
      </nav>
    )
  }

  export default TopBar;