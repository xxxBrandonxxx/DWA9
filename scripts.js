// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

// Define the book preview web component using a factory function
const BookPreview = ({ author, id, image, title }) => {
  const element = document.createElement('button')
  element.classList = 'preview'
  element.setAttribute('data-preview', id)

  // Populate the button with the book's image, title, and author
  element.innerHTML = `
    <img
      class="preview__image"
      src="${image}"
    />
    
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `

  return element
}

// Define initial page and book matches
let page = 1;
let matches = books

// Create a DocumentFragment to hold initial book previews
const starting = document.createDocumentFragment()

// Loop through the first BOOKS_PER_PAGE books in matches and create a BookPreview for each
for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  starting.appendChild(BookPreview(book))
}

// Append the starting DocumentFragment to the list of book previews
document.querySelector('[data-list-items]').appendChild(starting)

// Create a DocumentFragment to hold genre options
const genreHtml = document.createDocumentFragment()

// Create the first "All Genres" option and add it to the genre DocumentFragment
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

// Loop through the genres and add an option for each to the genre DocumentFragment
for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement('option')
  element.value = id
  element.innerText = name
  genreHtml.appendChild(element)
}

// Append the genre DocumentFragment to the genre dropdown
document.querySelector('[data-search-genres]').appendChild(genreHtml)

// Create a DocumentFragment to hold author options
const authorsHtml = document.createDocumentFragment()

// Create the first "All Authors" option and add it to the author DocumentFragment
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

// Loop through the authors and add an option for each to the author DocumentFragment
for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement('option')
  element.value = id
  element.innerText = name
  authorsHtml.appendChild(element)
}
// Append the author DocumentFragment to the author dropdown
document.querySelector('[data-search-authors]').appendChild(authorsHtml)

// Check for preferred color scheme and update CSS accordingly
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    // If the current theme is not night, set the theme to day and update the CSS variables
    document.querySelector('[data-settings-theme]').value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

// Update the "Show more" button to reflect the number of remaining books
document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

// Update the HTML of the "Show more" button to include the number of remaining books
document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

// Add event listeners to the cancel buttons of the search and settings overlays
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

// Add event listeners to the search and settings buttons in the header
document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true 
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true 
})

// Add an event listener to the close button in the book list overlay
document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const filters = Object.fromEntries(formData)
  const result = []

  for (const book of books) {
    let genreMatch = filters.genre === 'any' || book.genre === filters.genre
    let authorMatch = filters.author === 'any' || book.author === filters.author
    let titleMatch = book.title.toLowerCase().includes(filters.title.toLowerCase())

    if (genreMatch && authorMatch && titleMatch) {
      result.push(book)
    }
  }

  page = 1
  matches = result

  const previews = document.createDocumentFragment()

  for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    previews.appendChild(BookPreview(book))
  }

  document.querySelector('[data-list-items]').innerHTML = ''
  document.querySelector('[data-list-items]').appendChild(previews)

  document.querySelector('[data-list-button]').innerText = `Show more (${matches.length - (page * BOOKS_PER_PAGE)})`
  document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 0

  document.querySelector('[data-list-active]').open = false
  document.querySelector('[data-search-overlay]').open = false
})


    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false


document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
})

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})