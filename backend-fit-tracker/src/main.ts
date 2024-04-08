import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

console.log(process.env.DB_TYPE); // This should print "postgres" if your .env is set

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
