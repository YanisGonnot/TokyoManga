//import { Snackbar } from '@mui/material'
//import {Manga} from '../data/manga'
import { responseGetAllMangas } from '../../data/responseGetAllManga'
import axios from 'axios'
//import { enqueueSnackbar, SnackbarContent } from 'notistack'

/*
export const getMangasByPage = (pageNumber : number) => 
    fetch(`https://api.jikan.moe/v4/manga?page=${pageNumber}`)
        .then((response) => response)
        .then((body) => body.json())
        .then((bodyJSON) => bodyJSON.data as Manga[])


export const getMangasAndPagination = (pageNumber : number) => 
    fetch(`https://api.jikan.moe/v4/manga?page=${pageNumber}`)
        .then((response) => response)
        .then((body) => body.json())
        .then((bodyJson) => bodyJson as responseGetAllMangas)


export const getMangasForInfiniteScroll = (pageNumber : number) => {
    return fetch(`https://api.jikan.moe/v4/manga?page=${pageNumber}`)
            .then((response) => response)
            .then((body) => body.json())
            .then((bodyJson) => bodyJson as responseGetAllMangas)
}     
*/

//Axios
export const getMangasAxios = (pageNumber : number) => 
    axios.get(`https://api.jikan.moe/v4/manga?page=${pageNumber}`)
        .then((response) => response)
        .then((body) => body.data as responseGetAllMangas)
        //.catch((error) => enqueueSnackbar('There was a problem with the fetch operation:', error))


