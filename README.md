Movie Browser Web Application
Overview
The Movie Browser web application allows users to search for movies, filter results, and manage their favorite movies. The application uses the OMDb API to fetch movie data and provides a user-friendly interface with advanced filtering options and a favorites feature.

Running the Application
Prerequisites
Node.js (version 14 or later)
npm (Node Package Manager)
Installation
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd <project-directory>
Install Dependencies:

Ensure you are in the project directory and run:

bash
Copy code
npm install
Configure API Key:

Replace the placeholder API key in src/services/movieService.js with your own OMDb API key.

javascript
Copy code
const API_KEY = '4586cd63'; // Replace with your actual OMDb API key
Start the Development Server:

Run the following command to start the application:

bash
Copy code
npm start
Access the Application:

Open your web browser and navigate to http://localhost:3000 to view the application.

Design Decisions
Architecture
Frontend Framework: React was chosen for its component-based architecture, which facilitates a modular and maintainable codebase.
State Management: Utilized React's useState and useEffect hooks for managing state and handling side effects.
Routing: Implemented routing using react-router-dom to navigate between pages (Home and Favorites).
Components
Header: Provides navigation links to the Home and Favorites pages.
MovieList: Displays a list of movies with options to add to or remove from favorites.
SearchBar: Allows users to search for movies by title.
Filters: Provides options to filter movies by genre, release year range, and rating range.
FavoritesPage: Displays the list of saved favorite movies and allows users to remove them.
Accessibility
Semantic HTML: Used proper HTML elements and attributes to structure content and ensure accessibility.
Keyboard Navigation: Ensured all interactive elements are accessible via keyboard navigation.
ARIA Roles: Applied ARIA attributes to enhance accessibility for screen readers.
Color Contrast: Ensured sufficient contrast between text and background for readability.
Additional Features
Infinite Scrolling: Implemented infinite scrolling to handle large numbers of search results efficiently.
Local Storage: Used browser local storage to save and manage favorite movies.
Dynamic Filtering: Enabled dynamic filtering of movie results by genre, release year, and rating range.