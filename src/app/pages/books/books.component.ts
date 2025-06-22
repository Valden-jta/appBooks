import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { User } from '../../models/user';

import { BookService } from 'src/app/shared/book.service';
import { UserService } from 'src/app/shared/user.service';
import { ApiAnswer } from '../../models/api-answer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
 public user: User
  public bookList:Book[];

  constructor(private bookService: BookService, private userService: UserService,private toastr: ToastrService) {
    this.user = this.userService.serviceUser;
    this.bookService.books = [];
    this.bookList = [
    {
        "id_book": 21,
        "id_user": 5,
        "title": "La llamada de Cthulhu",
        "type": "Tapa Dura",
        "author": "H.P. Lovecraft",
        "price": 24.99,
        "photo": "https://www.planetadelibros.com/usuaris/libros/fotos/292/original/portada_la-llamada-de-cthulhu_h-p-lovecraft_201904111457.jpg"
    },
    {
        "id_book": 22,
        "id_user": 5,
        "title": "El color que cayó del cielo",
        "type": "Tapa Blanda",
        "author": "H.P. Lovecraft",
        "price": 20.99,
        "photo": "https://m.media-amazon.com/images/I/71yIBe3FaCL._AC_UF894,1000_QL80_.jpg"
    },
    {
        "id_book": 23,
        "id_user": 5,
        "title": "El caso de Charles Dexter Ward",
        "type": "Tapa Dura",
        "author": "H.P. Lovecraft",
        "price": 26.99,
        "photo": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546537819i/58115.jpg"
    },
    {
        "id_book": 24,
        "id_user": 5,
        "title": "El horror de Dunwich",
        "type": "Tapa Dura",
        "author": "H.P. Lovecraft",
        "price": 23.99,
        "photo": "https://m.media-amazon.com/images/I/81jQYca-OCL._AC_UF894,1000_QL80_.jpg"
    },
    {
        "id_book": 25,
        "id_user": 5,
        "title": "La sombra sobre Innsmouth",
        "type": "Tapa Dura",
        "author": "H.P. Lovecraft",
        "price": 25.99,
        "photo": "https://www.planetadelibros.com/usuaris/libros/fotos/383/original/portada_la-sombra-sobre-innsmouth_h-p-lovecraft_202310311551.jpg"
    },
    {
        "id_book": 30,
        "id_user": 5,
        "title": "La armadura de la luz",
        "type": "Tapa Dura",
        "author": "Ken Follett",
        "price": 31.99,
        "photo": "https://m.media-amazon.com/images/I/817ylM6zHsL._AC_UF894,1000_QL80_.jpg"
    },
    {
        "id_book": 35,
        "id_user": 5,
        "title": "La Gran Cacería",
        "type": "Tapa Dura",
        "author": "Brandon Sanderson",
        "price": 28.99,
        "photo": "https://www.planetadelibros.com/usuaris/libros/fotos/300/original/portada_la-gran-caceria-n-0214_robert-jordan_201910151032.jpg"
    },
    {
        "id_book": 40,
        "id_user": 5,
        "title": "Africanus",
        "type": "Tapa Dura",
        "author": "Santiago Posteguillo",
        "price": 31.99,
        "photo": "https://m.media-amazon.com/images/I/81NTQW75bIL._UF1000,1000_QL80_.jpg"
    }
]
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    
    // this.bookService.getAll(this.user.id_user).subscribe(
    //   (res: ApiAnswer)=> {
    //     if (Array.isArray(res.data)) this.bookService.books = res.data;
    //     this.bookList = this.bookService.books
    //     console.log('lista importada correctamente');
    //     console.log(this.bookList);
    //     this.toastr.success(res.message,'',{timeOut: 2000, positionClass: 'toast-top-right'});
    //   },
    //  (error) => {
    //    this.toastr.error(error.error?.message || 'Error de conexión', '', {
    //         timeOut: 2000,
    //         positionClass: 'toast-bottom-right',
    //       });
    //  }
    // );
  }
}
