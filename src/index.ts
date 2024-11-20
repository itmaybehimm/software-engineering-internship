import app from './app';
import { config } from './config/config';

console.log('-----------Initalizing server-----------');
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
