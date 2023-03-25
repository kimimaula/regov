REV-WEB

An Application created for Regov Technologies Interview

## Requirements

- Node.js
- npm

## Setup

1. Clone the repository:
   https://github.com/kimimaula/regov.git
2. Navigate to the project directory:
   `cd regov`
3. Install the dependencies:
   `npm install`
4. Create a `.env` file in the root directory of the project to store the environment variables:
   touch .env
5. Open the `.env` file and add the following environment variables:
   REACT_APP_BASE_API_URL="api url here"
   Replace `api url here` with actual values.
6. Save the `.env` file and close it.

## Running the Application

`npm run start`

To start the application, run the following command in the project directory:

The application will start and listen on port 3000

## Changelog

Changelog v0.1.1 20/3/2023

1. Initialize project with CRA
2. Added routing for app
3. Installed styled components and some base colors
4. Added textfield, formbutton and loginpage
5. Change defalt background to grey
6. Added forgot password page
7. Added env for environment variables and added file to gitignore
8. Standardize buttons and registration page
9. Complete integration with login and register

Changelog v0.1.2 21/3/2023

1. Added a header bar with navs for users to navigate
2. Added a Homepage where users well get news from the api
3. Added a dashboard where users can see the history of reviews
4. Added button to add reviews
5. Added Rating Component
6. Added TextArea component
7. Added Select Component
8. Store token when logging in and add private and public routes for when user is logged in
9. Added logout button to clear cookies when user clicks log out
10. Added integration with add reviews

Changelog v0.1.3 22/3/2023

1. Populate table with user reviews in user Dashboar page
2. Componentize add reviews modal for user dashboard
3. Renamed reviews page to events page
4. Add events page
5. Add event page for when user click events, they can see event page
6. Add ability for users to see reviews on event page
7. Add ability for users to add reviews on event page
8. Complete integration with events and event page
9. Added admin page
10. Populated admin page with data from server
11. Made event row clickable and editable
12. Complete integration with edit events
13. Made news row clickable and editable
14. Complete integration with edit news
15. Add and integrate ways for admin to add news and events

Changelog v0.1.4 23/3/2023

1. Removed reviews for other users to see
2. Added and integrated otp for users to change their passwords
3. Complete integration for users to edit reviews
4. Display Layout based on when user is logged in or not
5. Checks and displays header based on isAdmin
6. Cosmetic fixes for pages

Changelog v0.1.5 24/3/2023

1. added production env
2. fix and removed extra /
3. added regov as basename for url
4. added rule for when app refreshes
5. changed browser router to hash router to fix rendering in netlify
6. Standardize admin route names to camelCase
7. Added favicon and change app name

Changelog v0.1.5 25/3/2023

1. Changed url from antd images to random image generator
2. Installed jwt decode to decode for dashboard page
3. Added User profile and reset password to dashboard
4. Refactor change password to send OTP together when changing password
