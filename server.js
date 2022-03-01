const express = require('express');
const path = require('path');
const app = express();

// ___________ SERVER ______________________
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db/data.json')
const middlewares = jsonServer.defaults()


app.use(express.static(__dirname + '/dist/la-belle-plante'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/la-belle-plante/index.html') );
});
app.listen(process.env.PORT || 8080);

// ___________ SERVER ______________________
server.use(middlewares)
server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is run');
})
