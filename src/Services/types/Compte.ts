


export type Compte = {
    client:string,
    nom:string,
    agec:string,
    ageclib:string,
    libelle:string,
    compte:string,
    devise:string
}


export type CompteResponse = {
        count: number;
        next: string | null;
        previous: string | null;
        results: Compte[]
    
}