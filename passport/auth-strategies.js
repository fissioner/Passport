const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20'),
    FacebookStrategy = require('passport-facebook'),
    InstagramStrategy = require('passport-instagram'),
    TwitterStrategy = require('passport-twitter'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    User = require('../db-models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:3000/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(currentUser => {
            if (currentUser) {
                console.log(currentUser.username + ' logged in');
                done(null, currentUser);
            }
            else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then(newUser => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                })
            }
        })
    })
)

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos']
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }).then(currentUser => {
            if (currentUser) {
                console.log(currentUser.username + ' logged in');
                done(null, currentUser);
            }
            else {
                new User({
                    username: profile.displayName,
                    facebookId: profile.id,
                    thumbnail: profile._json.picture.data.url
                }).save().then(newUser => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                })
            }
        })
    }
));

passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ instagramId: profile.id }).then(currentUser => {
            if (currentUser) {
                console.log(currentUser.username + ' logged in');
                done(null, currentUser);
            }
            else {
                new User({
                    username: profile.username,
                    instagramId: profile.id,
                    thumbnail: profile._json.data.profile_picture
                }).save().then(newUser => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                })
            }
        })
    }
));

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ linkedInId: profile.id }).then(currentUser => {
        if (currentUser) {
            console.log(currentUser.username + ' logged in');
            done(null, currentUser);
        }
        else {
            new User({
                username: profile.displayName,
                linkedInId: profile.id,
                thumbnail: profile._json.pictureUrl
            }).save().then(newUser => {
                console.log('New user created: ' + newUser);
                done(null, newUser);
            })
        }
    })
}
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ twitterId: profile.id }).then(currentUser => {
            if (currentUser) {
                console.log(currentUser.username + ' logged in');
                done(null, currentUser);
            }
            else {
                new User({
                    username: profile.username,
                    twitterId: profile.id,
                    thumbnail: profile._json.profile_image_url_https
                }).save().then(newUser => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                })
            }
        })
    }
));

passport.use('registerUser', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        User.findOne({ username: username }).then(currentUser => {
            if (currentUser) {
                console.log('username taken');
                done(null, null);
            }
            else {
                new User({
                    username: username,
                    password: password,
                    email: req.body.email,
                    thumbnail: 'https://cdn.mamamia.com.au/wp/wp-content/uploads/2015/01/fbookprofile_featured.png'
                }).save().then(newUser => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                })
            }

        })
    }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password != password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));