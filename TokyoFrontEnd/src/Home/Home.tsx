//Nouveau fichier avec ReactQuery

import { useState,/* useEffect */} from 'react'
import { useQuery, keepPreviousData, /* useInfiniteQuery */} from '@tanstack/react-query'
//import { useInView } from 'react-intersection-observer';

import './Home.css'
import '../main.css'
import MangaCard from './MangaCard.tsx'
import Page from '../utils/pagination.tsx';
import {getMangasAxios } from '../network/getMangas.ts'




const HomeScreen = () => {

  const countMangaOnPage = 25 // choix arbitraire
  const [pageNumber, setPageNumber] = useState(1);


  //Après pagination
  const { isPending, isError, error, data, isPlaceholderData } =
    useQuery({
      queryKey: ['MANGAS', pageNumber],
      queryFn: () => getMangasAxios(pageNumber),
      placeholderData: keepPreviousData,
    })
    
  let contenu : React.ReactNode; 
  let statusText = "" 
  if (isPending) statusText = "Loading ..."
  else if (isError) statusText = JSON.stringify(error);
    
  if (statusText !== ""){
    contenu = <h1> {statusText} </h1>
  }
  else {
    const listCards = data!.data.map(card =>
      <MangaCard id={card.mal_id} title={card.title} imgUrl={card.images.jpg.image_url} key={card.mal_id} />
    );

    const hasNextPage_ = data!.pagination.has_next_page;
    const totalCountManga = data!.pagination.items.total;
    

    //INFINITE SCROLL
    /*
    const {fetchNextPage,fetchPreviousPage, hasNextPage, hasPreviousPage,
      isFetchingNextPage, isFetchingPreviousPage, promise,...result
    } = useInfiniteQuery({
      queryKey : ["MANGAS Scroll", pageNumber],
      queryFn: () => getMangasAndPagination(pageNumber),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
        lastPage.pagination.last_visible_page,
      getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
        firstPage.pagination.last_visible_page,
    })

    const { ref, inView } = useInView();

    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [fetchNextPage, inView]);
    */
    contenu = (
      <>
        <Page pageNumber={pageNumber} totalMangas={totalCountManga} countMangaOnPage={countMangaOnPage} 
          setPageNumber={setPageNumber} isPlaceholderData={isPlaceholderData} hasNextPage={hasNextPage_}/>

        <p className='infiniteScrollText' > Infinite Scroll </p>  
    
        <div className="cards">
          {listCards}
        </div>
      </>
    )
  }
  

  return (
    <>
      <div className='homeBackgroundWrapper'>
        <div className='shadowBgWrapper'>
          {contenu}
        </div>
      </div>
    </>
  )
}

export default HomeScreen