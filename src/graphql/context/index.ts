import { getSession } from 'next-auth/client';
import dbConnect from '@src/mongoDb/mongoDbClient';
import { Session } from 'next-auth';

export type Context = {
  session: Session;
};
export const setContext = async ({ req }): Promise<Context> => {
  const session = await getSession({ req });
  await dbConnect();
  return { session };
};
