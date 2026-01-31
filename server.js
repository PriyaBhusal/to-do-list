var express = require('express');
var http = require('http');
const body_parser = require("body-parser");
require('dotenv').config();
var port = process.env.PORT || 5000; // fallback port
const app = express();
const path = require('path');

const apiRouter = require('./router/apiRoutes');
const webRouter = require('./router/webRoutes');

const expressHbs = require('express-handlebars');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// Body parser
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

// Static folders
app.use("/uploads/images/", express.static("uploads/images"));
app.use(express.static(path.join(__dirname, "/public")));

// Handlebars setup
var hbs = expressHbs.create({
   extname: "hbs",
   defaultLayout: "default",
   layoutsDir: __dirname + "/views/layout",
   partialsDir: __dirname + "/views/partials",
   helpers: {}
});

app.engine("hbs", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Routers
app.use("/api", apiRouter);
app.use("/", webRouter);

// Swagger UI setup
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
var server = http.createServer(app);
server.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
   console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
});
