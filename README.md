# image-carousel-package

A simple, reusable image carousel utility for web projects.

## Installation

```sh
npm install image-carousel-package
```

## Usage

For use with build tools like Webpack, Vite, Create React App, etc.

1. **Add HTML structure:**

   ```html
   <div id="carousel-root">
     <button id="prevBtn">Prev</button>
     <div class="carousel">
       <!-- images will be rendered here -->
     </div>
     <button id="nextBtn">Next</button>
   </div>
   <div id="selectors" class="selectorsContainer">
     <!-- selectors will be rendered here -->
   </div>
   ```

2. **Import the JavaScript and CSS and initialize:**

   ```js
   import { createImageCarousel } from "image-carousel-package";
   import "image-carousel-package/style.css"; // optional, for default styling

   const images = [
     // add your image URLs here
     "img1.jpg",
     "img2.jpg",
     "img3.jpg",
     // ...
   ];

   // initialize the carousel with your own desired options
   const carousel = createImageCarousel({
     container: document.getElementById("carousel-root"),
     images,
     selectorsContainer: document.getElementById("selectors"),
     visibleCount: 5, // optional
     autoAdvanceMs: 5000, // optional
     onNext: (idx) => {
       /* input an optional callback */
     },
     onPrev: (idx) => {
       /* input an optional callback */
     },
   });

   document.getElementById("nextBtn").onclick = carousel.next;
   document.getElementById("prevBtn").onclick = carousel.prev;
   ```

## API

When you call `createImageCarousel`, it returns an object with these methods:

- **`next()`**  
  Advances the carousel to the next image.  
  _Example:_

  ```js
  carousel.next();
  ```

- **`prev()`**  
  Moves the carousel to the previous image.  
  _Example:_

  ```js
  carousel.prev();
  ```

- **`goTo(idx)`**  
  Jumps to the image at the specified index (`idx` is zero-based).  
  _Example:_

  ```js
  carousel.goTo(2); // shows the third image
  ```

- **`destroy()`**  
  Stops the auto-advance timer and removes any internal event listeners.  
  _Example:_
  ```js
  carousel.destroy();
  ```

You can use these methods to connect your own navigation buttons, create custom controls, or programmatically control the carousel from your application logic.

**Other Examples:**

```js
// jump to the first image on some event
someElement.onclick = () => carousel.goTo(0);

// stop the carousel when leaving the page
window.addEventListener("beforeunload", carousel.destroy);
```

## Customization

- Style the carousel and selectors via your own CSS. You can override the default styles in `style.css` if needed via the provided classes:
  - `.carousel`: The main carousel container.
  - `.selectorsContainer`: The container for image selector circles.
  - `.circle`: Individual selector circle for each image.
- Use any navigation buttons or icons you like.

## License

MIT
