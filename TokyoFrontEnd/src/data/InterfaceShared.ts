export interface ImageFormat {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}


export interface Title {
    type: string;
    title: string;
}


export interface Published {
    from: string | null;
    to: string | null;
    prop: {
      from: DateFormat;
      to: DateFormat;
    };
    string: string;
}
  
interface DateFormat {
    day: number | null;
    month: number | null;
    year: number | null;
}


export interface Entity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}