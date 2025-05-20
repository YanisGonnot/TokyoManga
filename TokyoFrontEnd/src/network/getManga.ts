import axios from 'axios';
import {MangaFull} from '../data/responseGetMangaById'

/*
const getMangaById = (mangaId : string) => {
    return fetch(`https://api.jikan.moe/v4/manga/${mangaId}/full`)
        .then((response) => response)
        .then((body) => body.json())
        .then((bodyJSON) => bodyJSON.data as MangaFull)
}

export default getMangaById;
*/

export const getOneMangaAxios = (mangaId: string) => 
    axios.get(`https://api.jikan.moe/v4/manga/${mangaId}/full`)
        .then((response) => response)
        .then((body) => {
            console.log(body.data.data)
            return body.data.data as MangaFull})


