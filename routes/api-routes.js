var db = require("../models");
var passport = require("../config/passport");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(app) {

  app.get("/api/brewery", function (req, res) {
    db.Brewery.findAll({
    }).then(function (dbBrewery) {
      res.json(dbBrewery);

    });
  });


  // app.get("/api/brewery/latlng", function (req, res) {

  //   db.Brewery.findAll({

  //     attributes: ['lat','long']
  //   }).then(function (dbBrewery) {

  //     res.json(dbBrewery);

  //   });
  // });


        //Search breweries

        app.get("/api/brewery/:city", function (req, res) {

          db.Brewery.findAll({
            where: {
                city: {
                  [Op.like]: '%' + req.params.city + '%'
                }
            },
            attributes: ['id','name', 'city', 'address', 'phonenumber'],
          }).then(function (dbBrewery) {
  
            res.json(dbBrewery);
      
          });
        });


        app.get("/api/profile", function(req, res){
          db.User.findOne({
            where: { id: req.user.id },
            include: 'breweries'
          }).then(function(dbBrewery){
          res.json(dbBrewery);
         });
        });

        app.post("/api/brewery/:id", function(req, res){
          console.log(req.user.id)
          db.UserBrewery.create({
            UserId: req.user.id,
            BreweryId: req.params.id
          }).then(function(dbbreweries){
            res.json(dbbreweries);
          });
        });




      //User Sign up and Login
      app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
      });

      app.post("/api/signup", function(req, res) {
        db.User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });

      app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });

      app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          res.json({});
        } else {
          res.json({
            name: req.user.name,
            id: req.user.id
          });
        }
      });
    
}