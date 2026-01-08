import { ObjectID } from 'bson';

// https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3
export function generatePaginationQuery(query, sortFields, after) {
  if (after == null) return query;

  let paginatedQuery = query;

  if (sortFields == null) {
    paginatedQuery._id = { $gt: new ObjectID(after) }; // Return next items
    return paginatedQuery;
  }

  const sortField = sortFields[0];
  const sortOperator = sortFields[1] === 1 ? '$gt' : '$lt';

  const paginationQuery = [
    { [sortField]: { [sortOperator]: after[sortField] } }, // Match the greater criteria
    {
      $and: [{ [sortField]: after[sortField] }, { _id: { [sortOperator]: after._id } }], // Match both the equality and after criteria
    },
  ];

  // Just append with the base query
  if (paginatedQuery.$or == null) {
    paginatedQuery.$or = paginationQuery;
  } else {
    paginatedQuery = { $and: [query, { $or: paginationQuery }] };
  }

  return paginatedQuery;
}
