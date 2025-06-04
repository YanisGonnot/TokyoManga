import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikesAxios, postLike, removeLikeAxios } from "../Home/service/getLikes";
import { useState } from "react";

export const useLikes = (mangaIdString: string) => {

    const [ errorLikes, setErrorLikes ] = useState("");
    const queryClient = useQueryClient();

    const {data: dataLikes, isError: isErrorLikes, error, isSuccess : isSuccessLikes } = useQuery({
        queryKey: ['Likes', mangaIdString],
        queryFn: () => getLikesAxios(mangaIdString),
        placeholderData: keepPreviousData,
        enabled: !!mangaIdString // empêche d'exécuter la requête avec une string vide
    })


    const addLikeMutation = useMutation({
        mutationFn: (mangaId: number) => postLike(mangaId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Likes', mangaIdString] });
        },
        onError: (error: any) => setErrorLikes(error.message)
    });


    const removeLikeMutation = useMutation({
        mutationFn: (mangaId: number) => removeLikeAxios(mangaId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Likes', mangaIdString] });
        },
        onError: (error: any) => setErrorLikes(error.message)
    });



    return {
        dataLikes,
        isErrorLikes,
        errorLikes,
        isSuccessLikes,
        addLike: addLikeMutation.mutate,
        removeLike: removeLikeMutation.mutate,
    }
    /*
    const [dataLikes, setDataLikes] = useState<ResponseLikesDto[]>([]);
    const [errorLikes, setErrorLikes] = useState<string>("");
    //const [isPlaceholderDataLikes, setIsPlaceholderDataLikes] = useState<boolean>();
    const [isSuccessLikes, setSuccessLikes] = useState(false);
    const [like, setLike] = useState(false);

    
    async function getLikes(mangaIDString: string) {
        const {isError, error, data } = useQuery({
            queryKey: ['Likes', mangaIDString],
            queryFn: () => getLikesAxios(mangaIDString),
            placeholderData: keepPreviousData,
        })
        
        if (!isError){
            setSuccessLikes(true);
            setDataLikes(data!)
            return "success";
        }
        else {
            setErrorLikes(error.message);
            return errorLikes;
        }
    }



    async function addLike(mangaId: string) {
        const {isError, error } = useQuery({
            queryKey: ['PostLike', mangaId],
            queryFn: () => postLike(mangaId)
        })
        
        if (!isError){
            setSuccessLikes(true);
            setLike(true)
            return "success";
        }
        else {
            setErrorLikes(error.message);
            return errorLikes;
        } 
    }


    async function removeLike(mangaId: string) {
        const {isError, error } = useQuery({
            queryKey: ['RemoveLike', mangaId],
            queryFn: () => removeLikeAxios(mangaId)
        })
        
        if (!isError){
            setSuccessLikes(true);
            setLike(false)
            return "success";
        }
        else {
            setErrorLikes(error.message);
            return errorLikes;
        } 
    }


    return {
        dataLikes,
        errorLikes,
        isSuccessLikes,
        like,
        getLikes,
        addLike,
        removeLike
    }
    */
}