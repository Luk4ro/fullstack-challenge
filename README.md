# Other improvements not added inside the code files

- Add a full page error boundary to catch any frontend errors and send to a 500 page. Also add other error pages such as 404
- Add layout components to be shared across pages, e.g. navbar
- Tests, can add unit testing, integration and E2E, even mutation testing.
- Better react component structure - I used Atomic design at a previous role for our component library. The Post component could definitely
  have the comment split out to a separate component. Same with the image component in the vault.
- Add a Robots.txt with a sitemap for SEO
- Maybe add tRPC for improved DX with typed endpoints. Didn't add due to time constraints. - Potentially not needed in newest NextJS due to server components?
- Team-wide linting and formatting e.g. eslint + prettier
- Pre-commit & pre-post hooks to run tests and linting
- Pick an appropriate DB ORM, e.g. TypeORM, Prisma, Drizzle
- DB indexes
- Absolute imports, e.g. @components or @db
- Middlewares to make accessing user session nice and easy
- Multiple image sizes for mobile or desktop

# Fanvue's Fullstack challenge

Setup the project:

Make sure you install all the dependencies (currently yarn, but you can opt-out) and start the solution in dev mode.

There is a simple homepage with links to the tasks below.

First Task:

- in the "feed" page, show a centered column of posts (use https://jsonplaceholder.typicode.com/ to get the data) which are simple boxes with the title and body properties returned
- for each post, fetch its relative comments and show the counter, or nothing if there are no comments
- when clicking on the comment counter, the comments appear below it

Second Task:

- create a "vault" page, showing a responsive grid of square pictures (use https://jsonplaceholder.typicode.com/ to get the data) which are simple thumbnails
- when clicking on a thumbnail, the fullscreen image opens

Touch base on the following:

- SSR considerations, if you have time, implement a simple server-side rendering
- Type the responses from the API calls
- create meaningful tags in the head of each page, or any other SEO consideration
- add the favicon stealing it from fanvue.com ;)
- a11y considerations

Note:

- Styling is not required, you should use MUI5 components out-of-the box, check docs here https://mui.com/material-ui/
- You can install your favourite fetch library, but you can also use the built-in fetch API
