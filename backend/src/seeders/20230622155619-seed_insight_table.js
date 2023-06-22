'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Insights', [{
        id:1,
        userId:"7a0eed16-9430-4d68-901f-c0d4c1c3bf00",
        insight:"You have overshoot your spend limit",
        date:new Date()
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      
     
      
      await queryInterface.bulkDelete('Insights', null, {});
     
  }
};
