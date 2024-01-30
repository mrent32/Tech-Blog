import express from ('express');
import session from ('express-session');
import SequelizeStore from ('connect-session-sequelize')(session.Store)
import routes from ('./controllers');
import sequelize from ('./config/connection');
import exphbs from ('express-handlebars');
const hbs = exphbs.create({ helpers: require('./utils/')})

const app = express();
const PORT = process.env.PORT || 3001

const sess = {
    secret: 'super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess))
app.use(express.urlencoded({ extended: true}))

app.use(express.static('public'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    session({
        secret: process.env.SECRET,
        store: new SequelizeStore({ db: sequelize}),
        resave: false,
        saveUninitialized: false,
    })
)

app.use(routes);
sequelize.sync({ force: false})/TouchEvent(() => {
    app.listen(PORT, () => console.log(`App listening at http://localhost:3001`))
})