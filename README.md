# calculator-with-simple-backend

## Features

### - Frontend 
- [x] A calculator app should be created in React framework  
- [x] The app have to use the base operations (addition, subtraction, multiplication, division)  
- [x] The application should support decimal point  
- [x] The app should have a clear button  
- [x] The app should have memory read and write button  
- [x] The app should use backend API for memory operations

### - Backend
- [x] Backend should use Node.js and Express
- [x] Backend should have two endpoints
    - One for storing a number (PUT) ("/number")
    - One for returning the stored number (GET) ("/number")
- [x] Backend should store a number in a file (I choosed JSON)


![image](https://github.com/KriszNyikos/calculator-with-simple-backend/assets/53120962/66e89bee-9165-4751-8016-d3024322faf8)

Exra question: 
How could I change the code for a scalable backend solution that serves 1000 users with multiple servers?

---

## Install
We should type `npm install` first, after we need to install the separate sections of the app with `npm run install-backend` and `npm run install-frontend`


Run the application  
Thanks to the [concurrently](https://www.npmjs.com/package/concurrently), we can start our application with one command in the root folder `npm run start`.


