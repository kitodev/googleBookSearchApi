$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getBooks(searchText);
        e.preventDefault();
    });
});

function getBooks(searchText){
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + searchText)
        .then((response) => {
            console.log(response);
            let books = response.data.items;

            let output = '';
            $.each(books, (index, book) => {
                output += `
                  <div class="col-md-3">
                    <div class="card text-center">
                      <img src="${book.volumeInfo.imageLinks.smallThumbnail}">
                       <a onclick="bookSelected('${book.id}')" href="#"><h5>${book.volumeInfo.title}</h5></a>
                    </div>
                  </div>
                `;
            });
            $('#books').html(output);
        }).catch((err) => {
        console.log(err);
        });
}

function bookSelected(id){
    sessionStorage.setItem('id', id);
    window.location = 'book.html';
    return false;
}

function getBook(){
    let bookId = sessionStorage.getItem('id');
    axios.get('https://www.googleapis.com/books/v1/volumes/' + bookId)
        .then((response) => {
            console.log(response);
            let book = response.data;
            
            let output =`
                <div class="row">
                  <div class="col-md-4">
                    <img src="${book.volumeInfo.imageLinks.smallThumbnail}" class="thumbnail">
                  </div>
                  <div class="col-md-8">
                    <h2>${book.volumeInfo.title}</h2>
                    <ul class="list-group">
                      <li class="list-group-item"><strong>Authors:</strong> ${book.volumeInfo.authors}</li>
                      <li class="list-group-item"><strong>Published:</strong> ${book.volumeInfo.publishedDate}</li>
                      <li class="list-group-item"><strong>Description:</strong> ${book.volumeInfo.description}</li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="well">
                    <a href="http://books.google.hu/books?id=${book.id}&hl=&source=gbs_api" target="_blank" class="btn btn-primary">View Google Books</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    <a class="btn btn-danger" onclick="addToCart('${book.item}')">Add To Cart</a>
                  </div>
                </div>
              `;
            $('#book').html(output);
        }).catch((err) => {
        console.log(err);
    });
    
}