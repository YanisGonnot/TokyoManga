import './mangaTypePastille.css';
import {PastilleProps} from './themePastille.tsx'


const MangaTypePastille = ({ type }: PastilleProps) => {
    return (
        <>
            <span className='mangaTypePastilleWrapper'>
                {type}
            </span>
        </>
    )
}


export default MangaTypePastille;