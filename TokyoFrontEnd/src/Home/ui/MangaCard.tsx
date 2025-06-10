import '../style/MangaCard.css'
import { NavLink } from 'react-router-dom'


interface CardProps {
  id: number,
  title: string,
  imgUrl: string,
  imgLike: string,
  setLike: (mangaId: string, isCurrentlyLiked: boolean) => void,
  likesNumber: number
}


function MangaCard({ id, title, imgUrl, imgLike, setLike, likesNumber  }: CardProps) {


  return (
    <>
      <div className='cardItem'>
        <div className='imageWrapper'>
          <img className="mangaImage imgLike" src={imgLike} width={50} height={50} onClick={setLike} />
          <h5 className='mangaImage likesNumber'> {likesNumber}</h5> 
          <NavLink to={`/manga/${id}`} state={imgUrl}>
            <img className="mangaImage cardImg" src={imgUrl} />   
          </NavLink>
        </div>
        <NavLink to={`/manga/${id}`}>
          <h3 className='cardTitle'>
            {title}
          </h3>
        </NavLink>
      </div>
    </>
  )
}

export default MangaCard