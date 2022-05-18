import { Test, TestingModule } from '@nestjs/testing';
import { BugsnagModule, BugsnagService } from '../src';

describe('Bugsnag Module', () => {
  it('Test root method', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BugsnagModule.forRoot({
          apiKey: 'some random key',
        }),
      ],
    }).compile();

    const provider = moduleFixture.get<BugsnagService>(BugsnagService);
    expect(provider).toBeInstanceOf(BugsnagService);
    expect(provider).toHaveProperty('instance');
    expect(provider.instance).toBeDefined();
  });

  it('Test root async method', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BugsnagModule.forRootAsync({
          useFactory: () => {
            return {
              apiKey: 'random-key',
            };
          },
        }),
      ],
    }).compile();

    const provider = moduleFixture.get<BugsnagService>(BugsnagService);
    expect(provider).toBeInstanceOf(BugsnagService);
    expect(provider).toHaveProperty('instance');
    expect(provider.instance).toBeDefined();
  });
});
