# Data collecting system
This system could collect the mobile sensor data of your phone and store the data to MongoDB database. 
The whole files and folders except the client folder is server end program based on Node.js with Express framework, while the client folder
contains the client end program based on vue CLI3. Before reading the program, it is better to get familiar with Node.js, Express framework,
vue CLI3, JavaScript, and HTML5.

## Server end
### Dependency
```
"bcrypt": "^4.0.1",
"body-parser": "^1.19.0",
"chalk": "^2.4.2",
"concurrently": "^5.1.0",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.4.2",
"nodemon": "^2.0.2",
"passport": "^0.4.1",
"passport-jwt": "^4.0.0",
"socket.io": "^2.2.0"
```
### Preparation, Download, and Build
To start the server end, you need the Node, npm, and a MongoDB Atlas account. Then, download the whole program through git.
```
$ git clone --recursive https://github.com/Charles-J97/Data-collecting-system-development-based-on-JavaScript
```
After downloading successfully, you can set your own port number where the server is running and MongoDB URI where your database is 
in `/tools/keys.js`
```
module.exports = {
  mongoURI: '...',   // You can replace the ... between the '' with your own MongoDB URI.
  serverPort: 5000,   // You can set your own port number where the server is running.
  secretOrKey: 'secret'
}
```
Then, you need to run the following command to install all dependencies.
```
$ npm build
```
After that, you can start the server by running the following command.
```
$ npm run server
```
If you can see `Server is starting at port xxx` and `Database connection success!`, you have already run the server successfully.

## Client end
### Dependency
```
"axios": "^0.19.2",
"bootstrap-vue": "^2.0.0-rc.11",
"element-ui": "^2.13.0",
"jwt-decode": "^2.2.0",
"socket.io-client": "^2.2.0",
"ua-device": "^0.1.10",
"vue": "^2.5.17",
"vue-router": "^3.0.1",
"vuex": "^3.0.1"
```
### Preparation, Download, and Build
To start the server end, you need the Node, npm, and vue CLI3. Then, you can configure the IP address 
and port number where the client is running in `/client/vue.config.js`.
```
devServer: {
  public: '192.168.3.7:8080',   // You can set your own IP address and port number where the client is running.
  hot: true,
  disableHostCheck: true
}
```
You also need to set the IP address where the client is running and the port number where the server is running in `/client/src/config/config.js`.
```
let config = {
  server: {
    url: 'http://192.168.3.7',    // This should be the IP address where the client is running.
    port: '5000'    // This should be consistent with the port number where your server is running.
  }
}
```
Then, you need to run the following command to install all dependencies.
```
$ npm build
```
After that, you can start the server by running the following command.
```
$ npm run client
```
If `Localhost` is available, you have already run the client successfully.
### Configure the network
You need to have `Nginx` in your computer. After that, you can run the following command to generate the `/dist` folder in the client folder.
```
$ npm run build
```
Configure the `/dist` folder in the Nginx, then you could see the project online.

## Run the server and client at the same time
In server, you could run the following command to run the server and client at the same time. It is convenient for developers.
```
$ npm run dev
```

## Last
This system could collect the mobile sensor data from phones and store it in MongoDB database. When developing it, I borrowed 
some ideas from [web-logger-server](https://github.com/TouchFishPioneer/weblogger-server) and [weblogger-client](https://github.com/TouchFishPioneer/weblogger-client)
written by Mr. Rui Song. In client end, I also added some interesting functions such as user registration and login, routing guard, and 
device check. This project is my last project in Southeast Univeristy. So I hope it is a good end for my undergraduate life.
