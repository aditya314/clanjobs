import 'graphql-import-node';
import { apolloServer } from '@src/graphql';

//IMPORTANT: Do not remove
export const config = {
  api: {
    bodyParser: false,
  },
};

async function start(req: any, res: any) {
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export default start;
