import { useMemo, useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'


import '../style/Home.css'
import '../../main.css'
import MangaCard from './MangaCard.tsx'
import Page from '../../utils/pagination.tsx';
import { getMangasAxios } from '../service/getMangas.ts'
import { useLikes } from '../../like/useLikes.ts'
import { MangaInfoWithLike } from '../interface/manga-info-with-like.ts'
import { enqueueSnackbar } from 'notistack'

import ImgLike from '../../assets/like_on.png';
import ImgLikeOff from '../../assets/like_off.png';


const HomeScreen = () => {

  const countMangaOnPage = 25 // choix arbitraire
  const [pageNumber, setPageNumber] = useState(1);


  //1er appel API: Mangas
  const { isPending, isError, error, data : dataMangas, isPlaceholderData } =
    useQuery({
      queryKey: ['MANGAS', pageNumber],
      queryFn: () => getMangasAxios(pageNumber),
      placeholderData: keepPreviousData,
    });

  const mangaIdString = useMemo(() => {
    if (!dataMangas?.data) return "";
    return dataMangas.data.map(manga => manga.mal_id).join(',');
  }, [dataMangas]);

  //2ème Appel API: Likes
  const { dataLikes, isSuccessLikes, addLike, removeLike }
    = useLikes(mangaIdString);

  let dataMangaWithLikes: MangaInfoWithLike[] = [];
  let handleLike: (mangaId: number, isCurrentlyLiked: boolean) => void;

  const tabImgLike = [ImgLike, ImgLikeOff]
  const [imageIndexLike, setImageIndexLike] = useState(1);


  let contenu: React.ReactNode;
  let statusText = "";

  if (isPending) statusText = "Loading ...";
  else if (isError) statusText = JSON.stringify(error);

  if (statusText !== "") {
    contenu = <h1> {statusText} </h1>
  }
  else {

    const hasNextPage_ = dataMangas!.pagination.has_next_page;
    const totalCountManga = dataMangas!.pagination.items.total;

    // Mapping des mangas + likes
    if (isSuccessLikes && dataLikes) {
      dataMangaWithLikes = dataMangas!.data.map(manga => ({
        infoManga: manga,
        likeManga: dataLikes[dataMangas!.data.indexOf(manga)]
      }));

      handleLike = (mangaId, isCurrentlyLiked) => {
        if (isCurrentlyLiked) {
          removeLike(mangaId);
        } else {
          addLike(mangaId);
        }
      };
    }
    else {
      dataMangaWithLikes = dataMangas!.data.map(manga => ({
        infoManga: manga,
        likeManga: {
          mangaId: manga.mal_id.toString(),
          countLikes: 0,
          isLikedByUser: false
        }
      }));

      handleLike = (mangaId, isCurrentlyLiked) => {
        const index = dataMangas!.data.indexOf(dataMangas!.data.filter(manga => manga.mal_id === mangaId)[0]);
        if (isCurrentlyLiked){
          dataMangaWithLikes[index].likeManga.countLikes--;
          dataMangaWithLikes[index].likeManga.isLikedByUser = false;
        }
        else {
          dataMangaWithLikes[index].likeManga.countLikes++;
          dataMangaWithLikes[index].likeManga.isLikedByUser = true;
        }
        setImageIndexLike(index => (index === 0 ? 1 : 0));
        enqueueSnackbar("Veuillez vous reconnecter et/ou contactez le SAV pour synchroniser votre affichage avec le serveur");
      }
    }

    
    const listCards = dataMangaWithLikes.map(manga => {
      return <MangaCard
        id={manga.infoManga.mal_id}
        title={manga.infoManga.title}
        imgUrl={manga.infoManga.images.jpg.image_url}
        key={manga.infoManga.mal_id}
        imgLike={manga.likeManga.isLikedByUser ? tabImgLike[0] : tabImgLike[1]}
        setLike={() => handleLike(manga.infoManga.mal_id, manga.likeManga.isLikedByUser)}
        likesNumber={manga.likeManga.countLikes}
      />
    });

    contenu = (
      <>
        <Page pageNumber={pageNumber} totalMangas={totalCountManga} countMangaOnPage={countMangaOnPage}
          setPageNumber={setPageNumber} isPlaceholderData={isPlaceholderData} hasNextPage={hasNextPage_} />

        <p className='infiniteScrollText' > Infinite Scroll </p>

        <div className="cards">
          {listCards}
        </div>
      </>
    );

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