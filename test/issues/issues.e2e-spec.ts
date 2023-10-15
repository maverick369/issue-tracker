import {
  INestApplication,
  ValidationPipe,
  HttpStatus,
  HttpServer,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { IssuesModule } from '../../src/issues/issues.module';
import { CreateIssueDto } from '../../src/issues/dto/create-issue.dto';

describe('[Feature] Issues - /issues', () => {
  const issue = {
    title: 'Test Issue',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    state: 1,
  };
  const expectedPartialIssue = expect.objectContaining({
    ...issue,
  });
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        IssuesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/issues')
      .send(issue as CreateIssueDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialIssue);
      });
  });

  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/issues')
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialIssue);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/issues/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialIssue);
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateIssueDto = {
      ...issue,
      title: 'Updated title',
      state: 2,
    };
    return request(httpServer)
      .patch('/issues/1')
      .send(updateIssueDto)
      .then(({ body }) => {
        expect(body.title).toEqual(updateIssueDto.title);
        expect(body.state).toEqual(updateIssueDto.state);

        return request(httpServer)
          .get('/issues/1')
          .then(({ body }) => {
            expect(body.title).toEqual(updateIssueDto.title);
            expect(body.state).toEqual(updateIssueDto.state);
          });
      });
  });

  it('Update to the previous state [PATCH /:id]', () => {
    const updateIssueDto = {
      ...issue,
      state: 1,
    };
    return request(httpServer)
      .patch('/issues/1')
      .send(updateIssueDto)
      .expect(HttpStatus.BAD_REQUEST)
      .then(({ body }) => {
        expect(body.message).toEqual(
          `The issue state cannot be set back to the previous state. Current state: 2`,
        );

        return request(httpServer)
          .get('/issues/1')
          .then(({ body }) => {
            expect(body.state).toEqual(2);
          });
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
      .delete('/issues/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/issues/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
