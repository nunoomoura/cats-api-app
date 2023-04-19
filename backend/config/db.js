const Sequelize = require("sequelize");
const Sequelize = new Sequelize(
    process.env.MYSQL_DB || "nodejs",
    process.env.MYSQL_USER || "root",
    process.env.MYSQL_PASSWORD || "", {
        host: process.env.MYSQL_HOST || "localhost",
        dialect: "mysql",
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});