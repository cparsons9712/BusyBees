import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './entities/session.entity';
import { connectionSource } from './config/typeorm';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await connectionSource.initialize(); // Ensure your DataSource is initialized
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost',
      'http://45.55.69.35',
      'http://beeproductive.net',
    ],
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
        domain: '.beeproductive.net',
        path: '/',
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000,
      }, //session should persist for 2 hours
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const message = errors
          .map((error) => Object.values(error.constraints).join(', '))
          .join('. ');
        return new BadRequestException(message);
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}

bootstrap();
