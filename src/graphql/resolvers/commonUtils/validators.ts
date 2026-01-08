import { reduce } from 'lodash';
import { ObjectId } from 'mongodb';

export const checkIfArrayHasValidObjectIDs = IDList =>
  reduce(IDList, (isValid, ID) => ObjectId.isValid(ID) && isValid, true);
