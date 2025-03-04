


export type Compte = {
    COMPTE:string,
    CLIENT:string,
    AGENCE:string,

    NOM:string,
    NCG:string,
    TYP:string,
    DATOUV:string,
    DATFRM:string
    CODFRM:string,
    EXPL:string,

    POSDEV:string,
    DATVAL:string,



}


export type CompteResponse = {
        count: number;
        next: string | null;
        previous: string | null;
        results: Compte[]
    
}