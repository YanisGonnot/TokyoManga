import { ResponseLikesDto } from "../interface/response-likes-dto"
import { axiosConfig } from "../../network/axiosConfig"


export const getLikesAxios = (likesMangaIdToDisplay: string) => {
    return axiosConfig.get(`/likes?mangaIdString=${likesMangaIdToDisplay}`)
        .then((response) => response)
        .then((body) => body.data as ResponseLikesDto[])
}


export const postLike = (mangaId: number) => {
    return axiosConfig.post(`/likes/${mangaId}/like`)
        .then((response) => response)
        .then((body) => body.data)
}


export const removeLikeAxios = (mangaId: number) => {
    return axiosConfig.post(`/likes/${mangaId}/unlike`)
        .then((response) => response)
        .then((body) => body.data)
}