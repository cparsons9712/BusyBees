import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './entities/session.entity';
import { connectionSource } from './config/typeorm';

async function bootstrap() {
  await connectionSource.initialize(); // Ensure your DataSource is initialized

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const sessionRepository = connectionSource.getRepository(SessionEntity);

  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'BUSYBEE_SESSION_ID',
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: 'lax',
      }, //session should persist for 2 hours
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}

bootstrap();
