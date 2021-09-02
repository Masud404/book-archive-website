const inputField = document.getElementById('input-field');
const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error')
const resultFound = document.getElementById('found-result');

//------------------- call api----------------
const searchBook = () => {
    const searchField = inputField.value;
    inputField.value = '';
    //------------ error handel---------------------
    if (searchField === '') {
        errorDiv.innerText = 'Please Search Valid Books'
        searchResult.innerHTML = '';
        resultFound.innerHTML = '';
        return;
    }
    //---------------------- fetch api-------------------
    else {
        const url = `https://openlibrary.org/search.json?q=${searchField}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                displayData(data.docs)
                errorDiv.innerText = `show result: ${data.numFound}`;
            })

    }


}
//------------------------ display book list-------------------
const displayData = books => {
    console.log(books)
    //--------------------- error handel-----------------------------
    if (books.length === 0) {
        errorDiv.innerHTML = 'Result No Found'
        return;
    }
    else {
        errorDiv.innerText = '';
    }
    searchResult.innerHTML = '';
    //------------------------ foreach loop-------------------
    books.forEach(book => {
        //----------------------- book card--------------------------
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
            <img width='100%' height="60%"  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Author Name: ${book.author_name}</p>
                <p class="card-text">Publisher Name: ${book.publisher}</p>
                <p class="card-text">Publish Date: ${book.first_publish_year}</p>
            </div>
        </div>
            `;
        searchResult.appendChild(div);
    })
}




