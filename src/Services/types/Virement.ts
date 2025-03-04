


export type Virement = {
    date_operation : string,
    montant_debit : string,
    montant_credit:string,
    client:string,
    compte_debit:string,
    compte_credit:string,
    status:string
    agence:string
}

export type VirmentResponse = {
        count: number;
        next: string | null;
        previous: string | null;
        results: Virement[]
    
        
}


export type VirementExterne = {
    oper:string,
    compte_benef:string,
    beneficiaire:string,
    date_transaction:string,
    devise:string,
    mode_reglement:string,
    montant_transaction:string,
    nif_nni:string,
    compte_don:string,
    nom_donneur_ordre:string,
    pays:string,
    produit:string,
    reference_transaction:string,

    taux_change : string,
    devisd_debit: string,
    devise_credit:string,
    montant_debit:string,
    montant_credit:string,



}


export type VirmentExterneResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: VirementExterne[]

    
}