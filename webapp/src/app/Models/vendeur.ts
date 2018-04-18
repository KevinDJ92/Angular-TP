export interface IVendeur {
    idVendeur: number,
    idUtilisateur: number,
    taux: number,
    typeCommission: string,
    minVentes: number
}

export class Vendeur {
    idVendeur: number;
    idUtilisateur: number;
    taux: number;
    typeCommission: string;
    minVentes: number;
}