
const express = require('express');
const path = require("path");
const db = require("../models")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = function(app) {


      app.get("/", function(req, res) {
        res.render("home");
      });

      app.get("/login", function(req, res) {
        res.render("login");
      });

      app.get("/signup", function(req, res) {
        res.render("signup");
      });


      app.get("/brewery", function(req, res) {
        res.render("brewery");
        });


      app.get("/results", function(req, res) {
        res.render("results");
      });
    

      app.get("/profile", function(req, res) {

        db.User.findOne({
           where: { id: req.user.id },
            include: 'breweries'
          
        }).then(function (dbBrewery) {
                  //  console.log(dbBrewery.breweries.map(breweryObj => breweryObj.Brewery))
                 console.log(dbBrewery.breweries)
                res.render("profile", dbBrewery);
          });

        });

    
}