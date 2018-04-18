export interface IProduct {
     idProduit: number,
     upc: string,
     nomProduit: string,
     image: string,
     categorie: string,
     codeUnit: number,
     prixVendant: number,
     prixAchat: number,
     quantite: number,
     description: string
}

export class Produit {
    constructor(
        public idProduit: number,
        public upc: string,
        public nomProduit: string,
        public image: string,
        public categorie: string,
        public codeUnit: number,
        public prixVendant: number,
        public prixAchat: number,
        public quantite: number,
        public description: string
    ) { }
 } 