import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('hbs', engine({
  defaultLayout: false
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));