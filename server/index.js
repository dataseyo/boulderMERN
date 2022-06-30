import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from './models/userModel.js'

// initialize app
const app = express()
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// allow cross origin requests
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// mongo connection
const CONNECTION_URL = "mongodb+srv://<user>:<pass>@<cluster>/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

// test route
app.get('/', (req, res) => {
    res.send("test")
})

// test app.post
app.use(bodyParser.json())

// user routes
import userRouter from './routes/user.js'
app.use('/user', userRouter)

// boulder routes
import boulderRouter from './routes/boulder.js'
app.use('/boulder', boulderRouter)

// authentication and session
app.use(session({
    secret: "climb",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000}
}))

app.use(passport.session())
app.use(express.urlencoded({ extended: false }));

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    })
  );

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post("/login", 
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

app.post("/logout", (req, res) => {
  req.session.destroy()
  console.log("logged out")
})

app.get('/currentuser', (req, res) => {
  console.log(req.session)
  // res.json({"currentUser": req.user, "session": req.session})
  res.json(req.session.passport)
})

app.use(passport.initialize())
