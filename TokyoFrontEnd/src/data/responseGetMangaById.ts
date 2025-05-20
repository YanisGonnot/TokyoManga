import {ImageFormat} from './InterfaceShared.ts'
import {Title} from './InterfaceShared.ts'
import {Published} from './InterfaceShared.ts'
import {Entity} from './InterfaceShared.ts'



interface MangaResponse {
    data: MangaFull;
  }
  

export interface MangaFull {
    mal_id: number;
    url: string;
    images: {
      jpg: ImageFormat;
      webp: ImageFormat;
    };
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string | null;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    chapters: number | null;
    volumes: number | null;
    status: string;
    publishing: boolean;
    published: Published;
    score: number | null;
    scored: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string | null;
    background: string | null;
    authors: Entity[];
    serializations: Entity[];
    genres: Entity[];
    explicit_genres: Entity[];
    themes: Entity[];
    demographics: Entity[];
    relations: Relation[];
    external: ExternalLink[];
}

  
  
interface Relation {
    relation: string;
    entry: Entity[];
}
  
interface ExternalLink {
    name: string;
    url: string;
}
  