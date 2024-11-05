"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John Doe",
          password: "123456",
          email: "john.doe@gmail.com",
          sex: "male",
          phone: "123456",
          address: "Quy Nhon",
          groupId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Jane Smith",
          password: "abcdef",
          email: "jane.smith@gmail.com",
          sex: "female",
          phone: "789012",
          address: "Hanoi",
          groupId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Michael Johnson",
          password: "123abc",
          email: "michael.j@gmail.com",
          sex: "male",
          phone: "345678",
          address: "Ho Chi Minh",
          groupId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Emily Davis",
          password: "emily123",
          email: "emily.davis@gmail.com",
          sex: "female",
          phone: "901234",
          address: "Da Nang",
          groupId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "David Brown",
          password: "brown789",
          email: "david.brown@gmail.com",
          sex: "male",
          phone: "567890",
          address: "Can Tho",
          groupId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Olivia Wilson",
          password: "olivia456",
          email: "olivia.wilson@gmail.com",
          sex: "female",
          phone: "234567",
          address: "Hue",
          groupId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
