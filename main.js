// Global Variables
const searchResult = document.getElementById('book-container');
const quantity = document.getElementById('quantity');

// Search Area
const searchBtn = document.getElementById('search-btn').addEventListener('click', () =>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    // clear previous search results when new data loads
    searchResult.textContent = '';
    // clear previous founded results quantity when new data loads
    quantity.textContent = '';

    // if search filed is blank
    if (searchText.trim() === '') {
        alert("Search field can't be empty!");
        return;
    }

    // fetch and display data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooksResult(data));
    // clear search field when data loads
    searchInput.value = '';
})

// Display Books
const displayBooksResult = data => {
    const books = data.docs;
    const numFound = data.numFound;

    // display founded results quantity
    quantity.innerHTML = `
        <h3><strong>${numFound === 0? 'No': numFound}</strong> Results Found</h3>
    `;
    books.forEach(book => {        
        const div = document.createElement('div');
        div.classList.add('col-md-3');

        // set inner html of search result div
        div.innerHTML = `
            <div class="card overflow-hidden p-2 bg-white rounded h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-100" alt="">
                
                <div class="card-body">
                    <h6> <strong>Book Name:</strong> ${book.title? book.title : 'Not Found'} </h6>
                    <h6> <strong>Author Name:</strong> ${book.author_name? book.author_name[0] : 'Not Found'} </h6>
                    <h6> <strong>Publisher:</strong> ${book.publisher? book.publisher[0] : 'Not Found'} </h6>
                    <h6> <strong>First Publish Year:</strong> ${book.first_publish_year? book.first_publish_year : 'Not Found'} </h6>
                </div>
            </div>
            
        `;
        searchResult.appendChild(div);
    })
}