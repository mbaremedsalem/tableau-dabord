


export type Compte = {
    COMPTE:string,
    CLIENT:string,
    NOM:string,
    NCG:string,
    TYP:string,
    DATOUV:string,
    DATFRM:string
    CODFRM:string,
    EXPL:string,

    AGENCE:string,
    POSDEV:string,
    DATVAL:string,



}


export type CompteResponse = {
        count: number;
        next: string | null;
        previous: string | null;
        results: Compte[]
    
}