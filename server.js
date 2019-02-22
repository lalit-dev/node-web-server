console.log('starting server........');
const express = require('express');
const hbs = require('hbs');
// console.log("prossess.env", JSON.stringify(process.env, undefined, 2));
const port = process.env.PORT || 5000;
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

app.listen(port, () => {
    console.log(`server is Up on port ${port}`);
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

