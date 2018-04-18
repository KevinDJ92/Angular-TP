export interface IClient {
    idClient: number,
    client: string,
    telephone: string,
    contact: string,
    adresse: string,
    description: string,
    codeUtilisateur: number
}

export class Client {
    constructor(
        public idClient: number,
        public client: string,
        public telephone: string,
        public contact: string,
        public adresse: string,
        public description: string,
        public codeUtilisateur: number
    ) { }
 } 