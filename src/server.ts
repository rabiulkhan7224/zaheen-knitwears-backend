import app from './app';
import { EnvConfig } from './config/env';

app.listen(EnvConfig.port, () => {
  console.log(`Server running on port ${EnvConfig.port}`);
});