import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useRef, useState} from 'react';
import { useQuery } from '@tanstack/react-query';

import '../style/MangaInfoScreen.css';
import '../../main.css';
//import { MangaFull } from '../data/responseGetMangaById';
import starOn from '../../assets/mangaDetails/Star_On.png';
import starOff from '../../assets/mangaDetails/Star_Off.png';
import ThemePastille from './themePastille';
import MangaTypePastille from './mangaTypePastille';
import AuthorCard from './authorCard';
import StatusCard from './statusCard';
import { getOneMangaAxios } from '../service/getManga';



const MangaInfoScreen = () => {

    const mangaId = useParams().id;
    const location = useLocation();
    const backImageState = location.state;

    
    const {status, error, data: mangaObj} = useQuery({
        queryKey: ["manga", mangaId], 
        queryFn: () => getOneMangaAxios(mangaId!),
      })
    

    const score = mangaObj?.score ? mangaObj.score : 0;
    const listStars: React.ReactNode[] = [];
    for (let i = 0; i < 10; i++) {
        if (i + 1 < score) {
            listStars[i] = <img src={starOn}/>;
        } else {
            listStars[i] = <img src={starOff} />;
        }
    }
    if (mangaObj == undefined || mangaObj.score == null) {
        listStars.push(<p className='infoNotFind'> Not scored </p>);
    }

    const backgroundImageRef = useRef<HTMLDivElement>(null);
    if (backgroundImageRef.current && mangaObj != undefined) {
        backgroundImageRef.current.style.backgroundImage = `url(${mangaObj.images.webp.large_image_url})`;
        backgroundImageRef.current.style.backgroundSize = 'cover';
        backgroundImageRef.current.style.height = '100dvh';
        
    }

    let synopsisText = "";
    if (mangaObj != undefined && mangaObj.synopsis) {
        let character: string | undefined;
        if (mangaObj.synopsis.includes('[')) {
            character = '[';
        }
        else if(mangaObj.synopsis.includes('(Source)')){
            character = ' (Source)'
        }
        if (character != undefined) {
            synopsisText = mangaObj.synopsis.substring(0, mangaObj.synopsis.indexOf(character));
        }
        else {
            synopsisText = mangaObj.synopsis;
        }
    }


    const mangaTypePastille = [<MangaTypePastille type={mangaObj?.demographics[0].name} key={mangaObj?.mal_id}/>];
    const listThemeCards = mangaObj?.themes.map(card =>
        <ThemePastille theme={card.name} />
    );


    const listAuthors = mangaObj?.authors.map(author =>
        <AuthorCard name={author.name} key={author.mal_id} />
    );


    let statusCardBg = '';
    let statusCardText = '';
    switch(mangaObj?.status){
        case 'Finished' : 
            statusCardBg = 'red';
            statusCardText = 'Finished';
            break;
        case 'Publishing': 
            statusCardBg = 'green';
            statusCardText = 'Publishing';
            break;
        case 'On Hiatus':
            statusCardBg = 'yellow';
            statusCardText = 'On Hiatus';
            break;    
    }

    const statusPastille = <StatusCard text={statusCardText} color={statusCardBg} />;
    

    let statusText = ""
    if (status !== "success" && status !== "error") statusText = "Loading ...";
    if (status === "error") statusText = JSON.stringify(error); 

    if (statusText != "") {
        return(
            <>
              <div className='homeBackgroundWrapper'>
                <div className='shadowBgWrapper'>
                  <h1>
                    {statusText}
                  </h1>
                </div>
              </div>
      
            </>
          )
    }
    else {
        return (
            <>
                <div className='bgImageWrapper' style={{ 
                    backgroundImage:`url(${backImageState})`,
                    backgroundSize: '30%', 
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'center'
                }}
>
                    <div className='shadowBgWrapper'>
                        <div className='mangaInfoLayout'>
                            <div className='mangaResume'>
                                <div className='stars'>
                                    {listStars}
                                </div>
                                <h1 className='mangaTitle'> {mangaObj?.title}</h1>
    
                                <p className='mangaSynopsis'>
                                    {synopsisText}
                                </p>

                                <NavLink to={`/manga/${mangaId}/reviews`} state={ mangaObj?.images?.webp.large_image_url }>
                                    <button className='Reviews'>
                                        Read & Write Reviews
                                    </button>
                                </NavLink>
                            </div>

                            <div className='mangaInfos'>
                                <h3 className='titles'> Type & Themes: </h3>
                                <div className='typeAndThemes'>
                                    <p> {mangaTypePastille} </p>
                                    <div className='mangaThemes'>
                                        {listThemeCards}
                                    </div>
                                </div>
    
                                <h3 className='titles'> Authors: </h3>
                                <div className='mangaAuthors'>
                                    {listAuthors}
                                </div>
    
                                <h3 className='titles'> Status: </h3>
                                <div> {statusPastille}</div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </>
        )
    }   
}

export default MangaInfoScreen