// Global Variables
const searchResult = document.getElementById('book-container');
const quantity = document.getElementById('quantity');


const searchBtn = document.getElementById('search-btn').addEventListener('click', () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchResult.textContent = '';
    quantity.textContent = '';

    // url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooksResult(data));
    searchInput.value = '';
})

const displayBooksResult = data => {
    const books = data.docs;
    const numFound = data.numFound;
    
    quantity.innerHTML = `
        <h3><strong>${numFound === 0? 'No': numFound}</strong> Result Found</h3>
    `;
    books.forEach(book => {        
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
            <div class="rounded overflow-hidden border p-2">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-100" alt="">
            </div>
            <div class="p-2 d-flex justify-content-between align-items-center d-md-block">
                <h6> <strong>Book Name:</strong> ${book.title? book.title : 'Not Found'} </h6>
                <h6> <strong>Author Name:</strong> ${book.author_name? book.author_name[0] : 'Not Found'} </h6>
                <h6> <strong>Publisher:</strong> ${book.publisher? book.publisher[0] : 'Not Found'} </h6>
                <h6> <strong>First Publish Year:</strong> ${book.first_publish_year? book.first_publish_year : 'Not Found'} </h6>
            </div>
        `;
        searchResult.appendChild(div);
    })
}