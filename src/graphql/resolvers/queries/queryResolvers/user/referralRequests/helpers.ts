import {
  NetworkType,
  ReferralRequest,
  ReferralRequestConnection,
  ReferralRequestEdge,
  ReferralRequestFilter,
  ReferralState,
  S3_Operation,
} from '@src/graphql/types';
import { find, has, isNil, map, reduce } from 'lodash';
import IReferralRequest, {
  IReferrerStateInfo,
} from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import {
  companyDBToGQLMapper,
  NETWORK_TYPE_DB_TO_GQL_MAPPER,
  REFERRAL_STATE_DB_TO_GQL_MAPPER,
} from '@src/coreUtils/dataParsers/dBToGQLMappers';
import { generateSignedURL } from '@src/coreUtils/s3Utils';
import { referralStatusGQLToMongoMapper } from '@src/graphql/resolvers/mutations/mutationResolvers/updateReferralState/helpers/referralStateValidators';

export function buildFilteredQueryForReferralRequests(
  query: object,
  filters: ReferralRequestFilter
) {
  const filterClauses = [];
  if (has(filters, 'referralState') && !isNil(filters.referralState))
    filterClauses.push({
      'referrersList.referralRequestStatus': { $in: filters.referralState },
    });

  if (has(filters, 'networkType') && !isNil(filters.networkType))
    filterClauses.push({
      seniority: {
        $in: filters.networkType,
      },
    });
  if (filterClauses.length === 0) return query;
  return {
    $and: filterClauses,
  };
}

export function getAggregateQueryForFetchingReferralRequestsPage(
  paginatedQuery: object,
  first: number
) {
  return [
    { $match: paginatedQuery },
    {
      $facet: {
        paginatedResults: [{ $limit: first }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ];
}

export function accumulateEdgesForReferralRequests(
  page: Record<string, ReferralRequest>
): Partial<ReferralRequestConnection> {
  return {
    edges: map(
      Object.keys(page),
      (cursor: string): ReferralRequestEdge => ({
        node: page[cursor],
        cursor,
      })
    ),
  };
}

export function accumulateNodesForReferralRequests(
  page: Record<string, ReferralRequest>
): Partial<ReferralRequestConnection> {
  return {
    nodes: map(Object.keys(page), (cursor: string): ReferralRequest => page[cursor]),
  };
}

function getReferralStateFromReferrerListGivenUsername(
  referrerList: Array<IReferrerStateInfo>,
  referrerUsername: string
): ReferralState {
  const referrerInfo: IReferrerStateInfo = find(
    referrerList,
    referrer => referrer.username === referrerUsername
  );
  return REFERRAL_STATE_DB_TO_GQL_MAPPER[referrerInfo.referralRequestStatus];
}

function getNetworkTypeFromReferrerListGivenUsername(
  referrerList: Array<IReferrerStateInfo>,
  referrerUsername: string
): NetworkType {
  const referrerInfo: IReferrerStateInfo = find(
    referrerList,
    referrer => referrer.username === referrerUsername
  );
  return NETWORK_TYPE_DB_TO_GQL_MAPPER[referrerInfo.networkType];
}

export function transformPageForReferralRequests(
  items: Array<IReferralRequest>,
  referrerUsername: string
): Record<string, ReferralRequest> {
  return reduce(
    items,
    (acc: Record<string, ReferralRequest>, item: IReferralRequest) => ({
      ...acc,
      [item._id.toString()]: {
        jobInfo: {
          linkedinJobId: item.jobInfo._id.toString(),
          jobLocation: item.jobInfo.jobLocation,
          jobUrl: item.jobInfo.jobUrl,
          jobRole: item.jobInfo.jobRole,
          company: companyDBToGQLMapper(item.jobInfo.company),
        },
        applicantInfo: {
          companyName: item.applicantInfo.companyName,
          currentDesignation: item.applicantInfo.currentDesignation,
          latestCollegeName: item.applicantInfo.latestCollegeName,
          name: item.applicantInfo.name,
          networkType: getNetworkTypeFromReferrerListGivenUsername(
            item.referrersList,
            referrerUsername
          ),
          profilePicUrl: generateSignedURL(S3_Operation.GetObject, {
            Bucket: item.applicantInfo.profilePic.bucketName,
            Key: item.applicantInfo.profilePic.key,
          }).signedURL,
          resumeUrl: generateSignedURL(S3_Operation.GetObject, {
            Bucket: item.applicantInfo.resume.bucketName,
            Key: item.applicantInfo.resume.key,
          }).signedURL,
          username: item.applicantInfo.username,
          yearsOfExperience: item.applicantInfo.yearsOfExperience,
        },
        referralState: REFERRAL_STATE_DB_TO_GQL_MAPPER[item.askedReferralStatus],
        // referralState: getReferralStateFromReferrerListGivenUsername(
        //   item.referrersList,
        //   referrerUsername
        // ),
        appliedOn: item.appliedOn,
      },
    }),
    {}
  );
}
