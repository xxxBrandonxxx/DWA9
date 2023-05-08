// This function creates a custom element called "book-preview" that displays a book preview
function createBookPreview() {
    // Define a function called "BookPreview"
    function BookPreview() {
      // Create a shadow DOM and a wrapper div
      const shadow = this.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'wrapper');
  
      // Create an image element and set its attributes
      const img = document.createElement('img');
      img.setAttribute('alt', '');
      img.setAttribute('class', 'thumbnail');
  
      // Create title, author, and genre elements and set their attributes
      const title = document.createElement('h3');
      title.textContent = '';
      title.setAttribute('class', 'title');
  
      const author = document.createElement('h4');
      author.textContent = '';
      author.setAttribute('class', 'author');
  
      const genre = document.createElement('h5');
      genre.textContent = '';
      genre.setAttribute('class', 'genre');
  
      // Append the image, title, author, and genre elements to the wrapper div
      wrapper.appendChild(img);
      wrapper.appendChild(title);
      wrapper.appendChild(author);
      wrapper.appendChild(genre);
  
      // Create a style element and set its content to the CSS for the book preview
      const style = document.createElement('style');
  
      style.textContent = `
        .wrapper {
          margin: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          display: inline-block;
          width: 300px;
        }
  
        .thumbnail {
          width: 100%;
          height: auto;
        }
  
        .title {
          font-size: 1.2em;
          margin: 10px 0 5px 0;
        }
  
        .author {
          font-size: 1em;
          margin: 5px 0;
        }
  
        .genre {
          font-size: 0.8em;
          margin: 5px 0;
        }
      `;
  
      // Append the style and wrapper elements to the shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
  
      // Define the getters and setters for the "image", "title", "author", and "genre" attributes
      Object.defineProperties(this, {
        image: {
          get: function () {
            return this.getAttribute('image');
          },
          set: function (value) {
            img.setAttribute('src', value);
            this.setAttribute('image', value);
          },
        },
        title: {
          get: function () {
            return this.getAttribute('title');
          },
          set: function (value) {
            title.textContent = value;
            this.setAttribute('title', value);
          },
        },
        author: {
          get: function () {
            return this.getAttribute('author');
          },
          set: function (value) {
            author.textContent = value;
            this.setAttribute('author', value);
          },
        },
        genre: {
          get: function () {
            return this.getAttribute('genre');
          },
          set: function (value) {
            genre.textContent = value;
            this.setAttribute('genre', value);
          },
        },
      });
    }
  
    // Set the prototype of "BookPreview" to be an instance of "HTMLElement"
    BookPreview.prototype = Object.create(HTMLElement.prototype);
    // Set the constructor of "BookPreview" to be "BookPreview"
    BookPreview.prototype.constructor = BookPreview;
  
    // Register the "book-preview" element with the browser
    customElements.define('book-preview', BookPreview);
  
    // Return the "BookPreview" constructor function
    return BookPreview;
  }
  