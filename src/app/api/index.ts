import { buildCreateApi, coreModule } from '@rtk-incubator/rtk-query';
import { angularHooksModule } from './module';

const createApi = buildCreateApi(coreModule(), angularHooksModule());

export * from './store-query.module';
export { createApi, angularHooksModule };
