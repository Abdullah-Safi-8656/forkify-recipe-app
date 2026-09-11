# 🍴 Forkify Recipe App

A modern recipe search application built with **vanilla JavaScript**, **MVC architecture**, **Parcel**, and the **Forkify API**.

Search for recipes, view detailed instructions, adjust serving sizes, bookmark your favorite recipes, and upload your own recipes.

## 🌐 Live Demo

**[View Live Demo](#)**




## ✨ Features

* 🔎 **Recipe Search** — Search through thousands of recipes using the Forkify API.
* 📄 **Pagination** — Browse search results page by page.
* 🍽️ **Recipe Details** — View ingredients, cooking time, servings, and recipe information.
* ➕➖ **Dynamic Servings** — Increase or decrease servings and automatically recalculate ingredient quantities.
* 🔖 **Bookmarks** — Save your favorite recipes for quick access.
* 💾 **Persistent Bookmarks** — Bookmarked recipes are stored in `localStorage`.
* ⬆️ **Recipe Upload** — Create and upload your own recipes through the application.
* 🔗 **Recipe URLs** — Each recipe can be accessed through its unique URL.
* 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile screens.
* ⚡ **Fast Development** — Built and bundled with Parcel.

## 🛠️ Technologies

| Technology              | Purpose                                 |
| ----------------------- | --------------------------------------- |
| **HTML5**               | Application structure                   |
| **SCSS**                | Styling and responsive design           |
| **JavaScript (ES6+)**   | Application logic                       |
| **MVC Architecture**    | Organizing application responsibilities |
| **Parcel**              | Bundling and development server         |
| **Forkify API**         | Recipe data and recipe uploads          |
| **Fraction.js**         | Formatting ingredient quantities        |
| **Core-JS**             | JavaScript compatibility                |
| **Regenerator Runtime** | Async/await compatibility               |
| **Git & GitHub**        | Version control                         |

## 🏗️ Architecture

The application follows the **Model-View-Controller (MVC)** architecture.

```text
                    ┌─────────────────┐
                    │   Controller    │
                    │                 │
                    │ Handles events  │
                    │ and coordinates │
                    │ the application  │
                    └────────┬────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
          ┌───────────────┐     ┌───────────────┐
          │     Model     │     │     Views     │
          │               │     │               │
          │ State         │     │ Recipe View   │
          │ API requests  │     │ Search View   │
          │ Data logic    │     │ Results View  │
          │ Bookmarks     │     │ Pagination    │
          │ Uploads       │     │ Bookmarks     │
          └───────────────┘     │ Add Recipe    │
                                │ Preview       │
                                └───────────────┘
```

### Model

Responsible for:

* Application state
* API requests
* Searching recipes
* Loading individual recipes
* Updating servings
* Managing bookmarks
* Uploading recipes

### Views

Responsible for:

* Rendering the UI
* Handling user interface events
* Updating the DOM
* Displaying loading and error states

### Controller

Acts as the bridge between the **Model** and **Views**.

It listens for user interactions, calls the appropriate model functions, and tells the views when to update.

## 📁 Project Structure

```text
forkify-recipe-app/
│
├── src/
│   ├── img/
│   │   └── icons.svg
│   │
│   ├── js/
│   │   ├── config.js
│   │   ├── controller.js
│   │   ├── helper.js
│   │   ├── model.js
│   │   │
│   │   └── views/
│   │       ├── View.js
│   │       ├── recipeView.js
│   │       ├── searchView.js
│   │       ├── resultsView.js
│   │       ├── paginationView.js
│   │       ├── bookmarksView.js
│   │       ├── addRecipeView.js
│   │       └── previewView.js
│   │
│   └── sass/
│       ├── _base.scss
│       ├── _components.scss
│       ├── _header.scss
│       ├── _preview.scss
│       ├── _recipe.scss
│       ├── _searchResults.scss
│       ├── _upload.scss
│       └── main.scss
│
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm

You can verify your installation with:

```bash
node --version
npm --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/Abdullah-Safi-8656/forkify-recipe-app.git
```

Then enter the project directory:

```bash
cd forkify-recipe-app
```

### 2. Install Dependencies

```bash
npm install
```

This reads `package.json` and installs the required dependencies into `node_modules`.

### 3. Start the Development Server

```bash
npm start
```

Parcel starts the development server and watches your files for changes.

The application will normally be available at:

```text
http://localhost:1234
```

### 4. Build for Production

```bash
npm run build
```

Parcel creates an optimized production build inside:

```text
dist/
```

The `dist/` directory is generated automatically and does not need to be committed to Git.

## ⚙️ Configuration

Application configuration is stored in:

```text
src/js/config.js
```

Example:

```javascript
export const API_URL =
  'https://forkify-api.jonas.io/api/v2/recipes/';

export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
```

### API Key

Recipe uploads require an API key from the Forkify API.

Do **not** commit private API keys or other secrets to GitHub.

If you use an environment variable for your API key, make sure the appropriate `.env` file is included in `.gitignore`.

## 🔌 API

This application uses the **Forkify API v2** for recipe data.

The application performs operations such as:

```text
GET   → Search recipes
GET   → Get a specific recipe
POST  → Upload a recipe
```

API documentation:

**https://forkify-api.jonas.io/**

## 💾 Data & State Management

The application maintains a central state object containing information such as:

```text
state
├── recipe
│   ├── id
│   ├── title
│   ├── publisher
│   ├── ingredients
│   └── ...
│
└── search
    ├── query
    ├── results
    ├── page
    └── resultsPerPage
```

Bookmarks are persisted using the browser's:

```javascript
localStorage
```

This allows bookmarked recipes to remain available after refreshing or reopening the browser.

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

Responsive behavior is implemented using **SCSS media queries**.

## 🌍 Deployment

The application can be deployed using platforms such as:

* Netlify
* Vercel
* GitHub Pages

For Netlify, the production configuration is:

```text
Build command:
parcel build index.html --dist-dir ./dist

Publish directory:
dist
```

Netlify installs the project's dependencies, runs the build command, and publishes the generated `dist` directory.

## 🧠 What I Learned

This project helped me practice and understand:

* Modern JavaScript
* ES modules
* Asynchronous JavaScript
* `async/await`
* Promises
* REST APIs
* AJAX requests
* MVC architecture
* Application state management
* Event handling
* DOM manipulation
* DOM diffing
* Local storage
* URL-based application state
* Pagination
* Parcel bundling
* SCSS
* Responsive web design
* Git and GitHub
* Production builds and deployment

## 🔮 Future Improvements

Possible improvements include:

* User authentication
* Cloud-based bookmark synchronization
* Better form validation
* Improved error handling
* Offline support
* Progressive Web App (PWA) functionality
* Improved accessibility
* Automated testing

## 🙏 Credits

This project was built as part of my journey learning modern JavaScript and web development.

Recipe data is provided by the **Forkify API**.

## 📄 License

This project is intended primarily for learning and portfolio purposes.
