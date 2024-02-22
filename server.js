import express from 'express';
import session from 'express-session';
import sequelizeStore from 'connect-session-sequelize';
const SequelizeStore = sequelizeStore(session.Store);
import routes from './controllers/index.js';

import sequelize from './config/connection.js';
import exphbs from 'express-handlebars';
import helpers from './utils/helpers.js';
const hbs = exphbs.create({helpers})

const app = express();
const PORT = process.env.PORT || 3001

const sess = {
    secret: 'super secret secret',
    cookie: {
        maxAge: 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(express.static('public'))

app.use(routes);
sequelize.sync({ force: false}).then(()  => {
    app.listen(PORT, () => console.log(`App listening at http://localhost:3001`))
})