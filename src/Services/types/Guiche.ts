


export type Guichet = {
    oper:string,
    type_operation:string,
    date_transaction:string,
    Compte_Don:string,
    Compte_benef:string,
    devise_debit:string,
    devise_credit:string
    nomlib:string,
    montant_debeit:string,
    montant_credit:string,
}


export type GuichetResponse = {
        count: number;
        next: string | null;
        previous: string | null;
        results: Guichet[]
    
}