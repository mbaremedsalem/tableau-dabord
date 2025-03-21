export type Client = {
    CLIENT:string,
    NOM:string,
    DATOUV:string,
    DATFRM:string
    AGENCE:string,
    TYPE:string,




}

export type ClientResponse = {
        count: number;
        next: string | null;
        previous: string | null;
        results: Client[]
    
}