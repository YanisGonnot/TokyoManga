import {Manga} from './manga.ts'

export interface responseGetAllMangas{

    pagination: PaginationInterface,
    data: Manga[]
}


interface PaginationInterface{
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: {
      count: number,
      total: number,
      per_page: number
    }
}
