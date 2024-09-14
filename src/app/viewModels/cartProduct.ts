export class cartProduct {
    constructor(
        public id:number,
        public title: string,
        public price: number,
        public image: string,
        public quantity: number,
        public subTotal: number,
    ) { }
}