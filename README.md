# E-Comm - Ecommerce Web Application

## Overview

E-Comm is a web application designed to facilitate online shopping and provide a seamless experience for buyers. It offers a wide range of products across various categories, allowing users to browse, add prodcuts to cart, and purchase items conveniently.

Author: Hoang Tran &lt;[hoangtlm2410@gmail.com.vn](hoangtlm2410@gmail.com.vn)&gt;

Design: [Figma](https://www.figma.com/design/1n1f1UrNSfznNV1vjZKbr3/E-Comm?node-id=14-581&t=vWuXw3Cf6s8Qdstk-1)

## Tech Stacks

- Front-end
  - React v18
  - React Router v6
  - Storybook
  - Chakra UI
- Other third parties
  - JSON server
  - Pagination API
- Deployment:
  - CI/CD: GitLab Pipeline
  - Render for JSON server: 🔥 Coming soon!
  - Vercel for Web site: 🔥 Coming soon!
  - Vercel for Storybook: 🔥 Coming soon!

## Requirements

- [Vite](https://vitejs.dev/) &gt;= 5.3.4
- [Node](https://nodejs.org/en/) &gt;= 20.12.2 / [npm](https://www.npmjs.com/) &gt;= 7.7.6
- [pnpm](https://pnpm.io/) &gt;= 8.7.0

## Getting Started

**Step by step to run the web site and storybook in your local**

1. Clone the project repository

   ```
   git clone git@gitlab.com:tranleminhhoang2410/ecomm-chakra-ui.git`
   ```

2. Install project dependencies

   ```
   pnpm install
   ```

3. Set up environment variables

- Create a `.env` file in the root directory
- Contact the author to get the value of environment variables (please follow `.env.example` to get the key)

4. Running the page

- Open a new terminal
- Run the page
  ```
  pnpm dev
  ```
- The page will run on [http://localhost:5173](http://localhost:5173) by default. You can access it using your browser.

5. Running the storybook

- Open a new terminal
- Run the storybook
  ```
  pnpm storybook
  ```
- The storybook will run on [http://localhost:6006](http://localhost:6006) by default. You can access it using your browser.
