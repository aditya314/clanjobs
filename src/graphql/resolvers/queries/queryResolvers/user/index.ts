import { QueryUserArgs, Resolver, ResolversTypes, User } from '@src/graphql/types';
import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import { Context } from '@src/graphql/context';
import {
  fetchUser,
  transformUserResponse,
} from '@src/graphql/resolvers/queries/queryResolvers/user/helpers';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';

const userResolver: Resolver<
  ResolversTypes['User'],
  ResolverParentTypes['Query'],
  Context,
  QueryUserArgs
> = async (_, { username }, { session }): Promise<User> => {
  return await pipe(fetchUser, transformUserResponse)({ username });
};
export default userResolver;
