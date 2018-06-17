import express from 'express';
import * as bodyParser from 'body-parser';


import { RegisterController } from './controllers/resgister.controller';
import { LoginController } from './controllers/login.controller';
import { BetController } from './controllers/bet.controller';
import { MatchResultController } from './controllers/match-result.controller';
import { UsersController } from './controllers/users.controller';


const app: express.Application = express();
const port: any = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/register',RegisterController);
app.use('/login',LoginController);
app.use('/bet',BetController);
app.use('/calculate',MatchResultController);
app.use('/users',UsersController);

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
