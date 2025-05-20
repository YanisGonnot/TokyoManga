import './MangaCard.css'
import { NavLink } from 'react-router-dom'


interface CardProps{
  id : number,
  title : string,
  imgUrl : string,
  handleClick? : () => void 
}


function MangaCard({id, title, imgUrl}: CardProps){


  return (
    <>
      <NavLink className='cardItem' to={`/manga/${id}`}>
        <img className="cardImg" src={imgUrl}/>
        <h3 className='cardTitle'>
          {title}
        </h3>
      </NavLink>
    </>
  )
}

export default MangaCard