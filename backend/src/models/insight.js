const sequelize=require("../config/db");
const {Model, DataTypes}=require("sequelize");

class Insight extends Model{}

Insight.init({

    insightId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },

    userId:{
        type:DataTypes.UUID,
        references:{
            model:"Users",
            key:'id'
        },
        allowNull:false
    },
    insightText:{
        type:DataTypes.TEXT,
        allowNull:true,

    },
    dateGenerated:{
        type:DataTypes.DATE
    },

    
},

{
    sequelize,
    modelName:sequelize
});

module.exports=Insight;