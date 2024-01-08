const express = require('express'); //Import the express dependency
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
const PORT = config['PORT']
const itemRoutes = require('./routes/item');
const categoryRoutes = require('./routes/category');
const markSoldRoutes = require('./routes/sold');
const registerRoutes = require('./routes/register');
const forgotRoutes = require('./routes/passwordReset');
const flash = require('express-flash');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const User = require('./models/User');


const initializePassport = require('./auth/passportStrategy');
const Item = require('./models/Item');

const messageRoute = require('./routes/messages');
const conversationRoute = require('./routes/conversations');
const userRoute = require('./routes/users');

//TODO Add ROUTES!

const app = express();
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
      //optionSuccessStatus:200
    }

    const store = new MongoDBStore({
      uri: process.env.MONGODB_URL,
      collection: 'sessions'
    });

    store.on('error', function (error) {
      console.error(error)
    });

    app.use(
      expressSession({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
          secure: false,
          httpOnly: true,
          maxAge: 3600000
        },
      })
    );
    initializePassport(passport);

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(methodOverride('_method'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors(corsOptions));

    app.get('/try', (req, res) => {
      res.send('Connected to try');
    });
    // app.use('/api/item', itemRoutes);
    app.use('/api', registerRoutes);
    app.use("/api/v1/product", itemRoutes);
    //Can add more routes here
    app.use('/api/conversations', conversationRoute);
    app.use('/api/messages', messageRoute);
    app.use('/api/user', userRoute);

    app.get('/api/auth', (req, res) => {
      if (req.isAuthenticated()) {
        console.log(`/api/auth called:`);
        res.status(200).json({ authenticated: true, user: req.user });
      } else {
        res.status(401).json({ authenticated: false, user: null });
      }
    })

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
      // If the code reaches here, it means authentication was successful
      res.status(200).json({ message: 'Login successful' });
    });

    app.post('/api/logout', (req, res) => {
      if (req.isAuthenticated()) {
        req.logout((err) => console.log(err));
        res.status(200).json({ message: 'Logout successful' });
      } else {
        res.status(401).json({ message: 'You are not logged in' });
      }
    });

    app.use('/', forgotRoutes);
    app.use('/api/item', itemRoutes);
    app.use('/api', categoryRoutes);
    app.use('/api', markSoldRoutes);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })

  });

module.exports = app;