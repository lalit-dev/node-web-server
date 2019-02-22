console.log('starting server........');
const express = require('express');
const hbs = require('hbs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public', () => {
    console.log(" loaded static library ");
}));
// app.use(express.static(__filename,));

hbs.registerHelper('uppercase', upCase);

app.use((req, res, next) => {
    console.log(`${new Date()}:`);
    next();
})

app.use((req, res, next) => {
    console.log(" stopped process")
    res.render('maintainance.hbs', {
        errorMessage: 'we are optimizing app to improve your experience! '
    })
})

function upCase(text){
    console.log("inside upCase");
    return text.toUpperCase();
}

app.listen(5000, () => {
    console.log("server is Up");
});

// var about = {
//     name: 'lalit yadav',
//     designation: 'developer',
//     likes:['food', 'movies', 'coding'],
//     cricketFan: true,
//     age: 23
// }

app.get('/', (req, res) => {
    // res.send('<h1>home page</h1>');
    res.render('home.hbs', {
        title:'Home Page'
    })
    

})

app.get('/about', (req, res) => {
    // res.send(about);
    res.render('about.hbs', {
        title:'About page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'invalid URL'
    })
})

