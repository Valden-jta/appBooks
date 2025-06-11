export class Book {
    public id_book: number;
    public id_user: number;
    public title: string;
    public type: string[];
    public genre: string;
    public author: string;
    public price: number[];
    public photo: string;
    public selected: number;

    constructor(id_book: number = 0, id_user: number = 0, title: string, type: string[], genre: string, author: string, price: number[], photo: string, selected:number = 0) {
        this.id_book = id_book;
        this.id_user = id_user;
        this.title = title;
        this.type = type;
        this.genre = genre;
        this.author = author;
        this.price = price;
        this.photo = photo;
        this.selected = selected;
    }

    showPrice(i:number):number {
        return this.price[i];
    }
}
