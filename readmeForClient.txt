-- steps to implement shadecn in your front end
1. install the dependencies
npm install -D tailwindcss postcss autoprefixer

2. initiate the tailwindcss
npx tailwindcss init -p


3. add the following in src/index.css file
@tailwind base;
@tailwind components;
@tailwind utilities;

4. in tailwind.config.js file, replace the content with the following
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}


5. in src file create another file named jsconfig.json and add the following
{
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}


6. in vite.config.js file add the following
resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  7. Run the shadcn-ui init command to setup your project:
  npx shadcn@latest init

  answer the questions as per your preferences then your project will be ready for using the shadcn component.

  for example to use a button component run below command
  npx shadcn@latest add button


then import the button component in your project where ever you need it.



*** in this project we haven't created separate form for all required component, instead we have created a common formControl which can be reused where ever it is required


*** use sessionStrorage to store the things so that when the page got refreshed, the data remains there.

*** use of useSearchParams from react-router-dom, it helps to change the url


=================================

For order and payment options

-- 1. Need to create a paypal account
--- after creating paypal account - in google search for paypal develper dashboard- for that no need to create any further account
---then click on app & credentials and create App, give any resonable name to it.
--- the app that you create will have its own Client ID, Secret key 1, email and password.
--- but if you use the same email and password to for login then you wont be able to make any order for that, you can create any other person email id for testing purpose. for that follow the following steps
-- click on Testing tools button and choose sandbox accounts and then create another account and use that account for testing purpose.
