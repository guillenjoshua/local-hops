module.exports = function(sequelize, DataTypes) {
    var Brewery = sequelize.define("Brewery", {
     
    lat: {
        type: DataTypes.DECIMAL(10, 7)
    },
    long: {
        type: DataTypes.DECIMAL(10, 7)
    },
    name: {
        type: DataTypes.STRING
    }, 
    address: {
        type: DataTypes.STRING
    }, 
    city: {
        type: DataTypes.STRING
    }, 
    state: {
        type: DataTypes.STRING
    },
    phonenumber: {
        type:DataTypes.STRING
    },
    brewerytype: {
        type: DataTypes.STRING
    }
        },{
        timestamps: false

    });
    Brewery.associate = function(models) {
        Brewery.belongsToMany(models.User, {
          through: 'UserBrewery',
          as: 'users',
          foreignKey: 'BreweryId'
        });
      };

    return Brewery;
};


  