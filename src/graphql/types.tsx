import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & {
  [P in K]-?: NonNullable<T[P]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AcceptingReferrers = {
  acceptingReferrersClanWise: Array<AcceptingReferrersClanWise>;
  acceptingReferrersPublic: AcceptingReferrersPublic;
};

export type AcceptingReferrersClanWise = {
  clanInfo: Clan;
  userCount: Scalars['Int'];
  users?: Maybe<Array<User>>;
};

export type AcceptingReferrersPublic = {
  userCount: Scalars['Int'];
  users?: Maybe<Array<User>>;
};

export type ApplicantInfo = {
  companyName?: Maybe<Scalars['String']>;
  currentDesignation?: Maybe<Scalars['String']>;
  latestCollegeName: Scalars['String'];
  name: Scalars['String'];
  networkType: NetworkType;
  profilePicUrl?: Maybe<Scalars['String']>;
  resumeUrl: Scalars['String'];
  username: Scalars['String'];
  yearsOfExperience: YearsOfExperience;
};

export type AskReferralInput = {
  isPersonalReferral: Scalars['Boolean'];
  jobId: Scalars['ID'];
  referrerUsername?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type AskReferralPayload = {
  jobId?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};

export type AskedReferral = {
  acceptedReferrers?: Maybe<Array<Scalars['String']>>;
  appliedOn: Scalars['Int'];
  askedReferralStats: Array<AskedReferralStat>;
  jobInfo: JobInfo;
  referralState: ReferralState;
};

export type AskedReferralConnection = {
  edges?: Maybe<Array<Maybe<AskedReferralEdge>>>;
  nodes?: Maybe<Array<Maybe<AskedReferral>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AskedReferralEdge = {
  cursor: Scalars['ID'];
  node: AskedReferral;
};

export type AskedReferralFilter = {
  referralState?: Maybe<Array<ReferralState>>;
};

export type AskedReferralStat = {
  referralState: ReferralState;
  referrerCount: Scalars['Int'];
};

export type Clan = {
  clanType: ClanType;
  id: Scalars['ID'];
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  sourceId: Scalars['ID'];
};

export enum ClanType {
  College = 'COLLEGE',
  Company = 'COMPANY',
}

export type CodingProfile = {
  platformName: Scalars['String'];
  url: Scalars['String'];
  username: Scalars['String'];
};

export type CodingProfileInput = {
  platformName: Scalars['String'];
  url: Scalars['String'];
  username: Scalars['String'];
};

export type CollegeAutocomplete = {
  id: Scalars['ID'];
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CollegesAutocompleteResponse = {
  colleges: Array<CollegeAutocomplete>;
};

export type CompaniesAutocompleteResponse = {
  companies: Array<CompanyAutocomplete>;
};

export type Company = {
  clanId: Scalars['ID'];
  id: Scalars['ID'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
};

export type CompanyAutocomplete = {
  logoUrl: Scalars['String'];
  name: Scalars['String'];
};

export type CompanyInfo = {
  domain: Scalars['String'];
  name: Scalars['String'];
};

export type EducationDetails = {
  education: Array<EducationInfo>;
  latestCollegeName: Scalars['String'];
};

export type EducationInfo = {
  clanId: Scalars['ID'];
  degree: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  specialization: Scalars['String'];
  yearOfGraduation: Scalars['Int'];
};

export type EducationInfoInput = {
  collegeId: Scalars['ID'];
  degree: Scalars['String'];
  specialization: Scalars['String'];
  yearOfGraduation: Scalars['Int'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type GetSignedS3UrlInput = {
  operation: S3_Operation;
  s3Params: S3ParamsInput;
};

export type GetSignedS3UrlResponse = {
  signedURL: Scalars['String'];
  url: Scalars['String'];
};

export type Job = {
  acceptingReferrers: AcceptingReferrers;
  company: Company;
  hasAlreadyRequested: Scalars['Boolean'];
  hasEnoughGems: Scalars['Boolean'];
  linkedInUrl: Scalars['String'];
  linkedinJobId: Scalars['String'];
  location: Scalars['String'];
  postedDate: Scalars['Int'];
  recency: Recency;
  role: Scalars['String'];
  seniority?: Maybe<Seniority>;
  url?: Maybe<Scalars['String']>;
};

export type JobAcceptingReferrersArgs = {
  username: Scalars['String'];
};

export type JobHasAlreadyRequestedArgs = {
  username: Scalars['String'];
};

export type JobConnection = {
  edges?: Maybe<Array<Maybe<JobEdge>>>;
  nodes?: Maybe<Array<Maybe<Job>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type JobEdge = {
  cursor: Scalars['ID'];
  node: Job;
};

export type JobFilter = {
  companies?: Maybe<Array<Scalars['ID']>>;
  recency?: Maybe<Recency>;
  seniority?: Maybe<Array<Seniority>>;
};

export type JobInfo = {
  company: Company;
  jobLocation: Scalars['String'];
  jobRole: Scalars['String'];
  jobUrl: Scalars['String'];
  linkedinJobId: Scalars['String'];
};

export type JobPreference = {
  noticePeriod: Scalars['Int'];
  preferredCTC: Scalars['Int'];
  preferredLocations?: Maybe<Array<Scalars['String']>>;
  preferredRole: Scalars['String'];
};

export type Mutation = {
  askReferral?: Maybe<AskReferralPayload>;
  createTodo: TodoMvc;
  getCollegesAutocomplete: CollegesAutocompleteResponse;
  getCompaniesAutocomplete: CompaniesAutocompleteResponse;
  getSignedS3URL: GetSignedS3UrlResponse;
  getSkillsAutocomplete: SkillsAutocompleteResponse;
  isUsernameAvailable: Scalars['Boolean'];
  updateReferralSettings?: Maybe<UpdateReferralSettingsPayload>;
  updateReferralState?: Maybe<UpdateReferralPayload>;
  updateTodo?: Maybe<TodoMvc>;
  updateUserBasicInfo?: Maybe<UpdateUserBasicInfoPayload>;
  updateUserClanInfo?: Maybe<UpdateUserClanInfoPayload>;
  updateUserJobPreference?: Maybe<UpdateUserJobPreferencePayload>;
  updateUserOnboardingBasicInfo?: Maybe<UpdateUserOnboardingBasicInfoPayload>;
  updateUserOnboardingClanInfo?: Maybe<UpdateUserOnboardingClanInfoPayload>;
  updateUserOnboardingJobPreference?: Maybe<UpdateUserOnboardingJobPreferencePayload>;
  updateUserOnboardingProfileInfo?: Maybe<UpdateUserOnboardingProfileInfoPayload>;
  updateUserProfileInfo?: Maybe<UpdateUserProfileInfoPayload>;
};

export type MutationAskReferralArgs = {
  input: AskReferralInput;
};

export type MutationCreateTodoArgs = {
  description: Scalars['String'];
};

export type MutationGetCollegesAutocompleteArgs = {
  prefix: Scalars['String'];
};

export type MutationGetCompaniesAutocompleteArgs = {
  prefix: Scalars['String'];
};

export type MutationGetSignedS3UrlArgs = {
  input: GetSignedS3UrlInput;
};

export type MutationGetSkillsAutocompleteArgs = {
  prefix: Scalars['String'];
};

export type MutationIsUsernameAvailableArgs = {
  input: Scalars['String'];
};

export type MutationUpdateReferralSettingsArgs = {
  input: UpdateReferralSettingsInput;
};

export type MutationUpdateReferralStateArgs = {
  input: UpdateReferralStateInput;
};

export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput;
  todoId: Scalars['ID'];
};

export type MutationUpdateUserBasicInfoArgs = {
  input: UpdateUserBasicInfoInput;
};

export type MutationUpdateUserClanInfoArgs = {
  input: UpdateUserClanInfoInput;
};

export type MutationUpdateUserJobPreferenceArgs = {
  input: UpdateUserJobPreferenceInput;
};

export type MutationUpdateUserOnboardingBasicInfoArgs = {
  input: UpdateUserOnboardingBasicInfoInput;
};

export type MutationUpdateUserOnboardingClanInfoArgs = {
  input: UpdateUserOnboardingClanInfoInput;
};

export type MutationUpdateUserOnboardingJobPreferenceArgs = {
  input: UpdateUserOnboardingJobPreferenceInput;
};

export type MutationUpdateUserOnboardingProfileInfoArgs = {
  input: UpdateUserOnboardingProfileInfoInput;
};

export type MutationUpdateUserProfileInfoArgs = {
  input: UpdateUserProfileInfoInput;
};

export enum NetworkType {
  Clan = 'CLAN',
  Personal = 'PERSONAL',
  Public = 'PUBLIC',
}

export type OnboardingBasicInfo = {
  isFresher: Scalars['Boolean'];
  name: Scalars['String'];
  role: Scalars['String'];
  skills: Skills;
  username: Scalars['String'];
  yearsOfExperience: YearsOfExperience;
};

export type OnboardingClanInfo = {
  currentCompany?: Maybe<Company>;
  currentDesignation?: Maybe<Scalars['String']>;
  education: Array<EducationInfo>;
  pastCompanies?: Maybe<Array<Company>>;
  resumeUrl: Scalars['String'];
};

export type OnboardingJobPreference = {
  invitedBy: Scalars['String'];
  noticePeriod: Scalars['Int'];
  preferredCTC: Scalars['Int'];
  preferredLocations?: Maybe<Array<Scalars['String']>>;
  preferredRole: Scalars['String'];
  signupReason: Scalars['String'];
};

export type OnboardingProfileInfo = {
  codingProfiles?: Maybe<Array<CodingProfile>>;
  gender: Gender;
  phoneNumber: Scalars['String'];
  profileHeadline?: Maybe<Scalars['String']>;
  profilePicUrl?: Maybe<Scalars['String']>;
};

export enum OnboardingState {
  BasicInfo = 'BASIC_INFO',
  ClanInfo = 'CLAN_INFO',
  JobPreference = 'JOB_PREFERENCE',
  ProfileInfo = 'PROFILE_INFO',
}

export type OnboardingUser = {
  email: Scalars['String'];
  isFresher?: Maybe<Scalars['Boolean']>;
  lastCompletedState: OnboardingState;
  onboardingBasicInfo?: Maybe<OnboardingBasicInfo>;
  onboardingClanInfo?: Maybe<OnboardingClanInfo>;
  onboardingJobPreference?: Maybe<OnboardingJobPreference>;
  onboardingProfileInfo?: Maybe<OnboardingProfileInfo>;
  username?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  endCursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['ID']>;
};

export type PersonalDetails = {
  gender: Gender;
  invitedBy?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  signUpReason?: Maybe<Scalars['String']>;
};

export type PersonalReferralJob = {
  company: Company;
  hasAlreadyPersonallyRequested: Scalars['Boolean'];
  hasEnoughGems: Scalars['Boolean'];
  isEligible: Scalars['Boolean'];
  linkedInUrl: Scalars['String'];
  linkedinJobId: Scalars['String'];
  location: Scalars['String'];
  postedDate: Scalars['Int'];
  recency: Recency;
  referralSettings: ReferralSettings;
  referrerUsername: Scalars['String'];
  role: Scalars['String'];
  seniority?: Maybe<Seniority>;
  url?: Maybe<Scalars['String']>;
};

export type PersonalReferralJobHasAlreadyPersonallyRequestedArgs = {
  applicantUsername: Scalars['String'];
};

export type PersonalReferralJobHasEnoughGemsArgs = {
  applicantUsername: Scalars['String'];
};

export type PersonalReferralJobIsEligibleArgs = {
  applicantUsername: Scalars['String'];
};

export type PersonalReferralJobConnection = {
  edges?: Maybe<Array<Maybe<PersonalReferralJobEdge>>>;
  nodes?: Maybe<Array<Maybe<PersonalReferralJob>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PersonalReferralJobEdge = {
  cursor: Scalars['ID'];
  node: PersonalReferralJob;
};

export type PersonalReferralJobFilter = {
  recency?: Maybe<Recency>;
  seniority?: Maybe<Array<Seniority>>;
};

export type Query = {
  Todo?: Maybe<TodoMvc>;
  allTodos: Array<TodoMvc>;
  jobs: JobConnection;
  onboardingUser?: Maybe<OnboardingUser>;
  personalReferralJobs: PersonalReferralJobConnection;
  user: User;
};

export type QueryTodoArgs = {
  todoId: Scalars['ID'];
};

export type QueryJobsArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  filters?: Maybe<JobFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  username: Scalars['String'];
};

export type QueryOnboardingUserArgs = {
  email: Scalars['String'];
};

export type QueryPersonalReferralJobsArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  filters?: Maybe<PersonalReferralJobFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  referrerUsername: Scalars['String'];
};

export type QueryUserArgs = {
  username: Scalars['ID'];
};

export enum Recency {
  Any = 'ANY',
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
}

export type ReferralRequest = {
  applicantInfo: ApplicantInfo;
  appliedOn: Scalars['Int'];
  jobInfo: JobInfo;
  referralState: ReferralState;
};

export type ReferralRequestConnection = {
  edges?: Maybe<Array<Maybe<ReferralRequestEdge>>>;
  nodes?: Maybe<Array<Maybe<ReferralRequest>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReferralRequestEdge = {
  cursor: Scalars['ID'];
  node: ReferralRequest;
};

export type ReferralRequestFilter = {
  networkType?: Maybe<Array<NetworkType>>;
  referralState?: Maybe<Array<ReferralState>>;
};

export type ReferralSettings = {
  eligibleClans?: Maybe<Array<Clan>>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export enum ReferralState {
  Accepted = 'ACCEPTED',
  Acknowledged = 'ACKNOWLEDGED',
  Applied = 'APPLIED',
  Declined = 'DECLINED',
  Expired = 'EXPIRED',
  InReview = 'IN_REVIEW',
}

export type S3ParamsInput = {
  bucket: Scalars['String'];
  key: Scalars['String'];
};

export type S3Path = {
  bucket: Scalars['String'];
  key: Scalars['String'];
};

export type S3PathInput = {
  bucket: Scalars['String'];
  key: Scalars['String'];
};

export enum S3_Operation {
  GetObject = 'GET_OBJECT',
  PutObject = 'PUT_OBJECT',
}

export enum Seniority {
  Associate = 'ASSOCIATE',
  Director = 'DIRECTOR',
  EntryLevel = 'ENTRY_LEVEL',
  Executive = 'EXECUTIVE',
  Internship = 'INTERNSHIP',
  MidSenior = 'MID_SENIOR',
}

export type Skill = {
  id: Scalars['ID'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
};

export type SkillAutocomplete = {
  id: Scalars['ID'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
};

export type Skills = {
  coreSkills: Array<Skill>;
  familiarSkills: Array<Skill>;
};

export type SkillsAutocompleteResponse = {
  skills: Array<SkillAutocomplete>;
};

export type TodoMvc = {
  completed: Scalars['Boolean'];
  description: Scalars['String'];
  todoId: Scalars['ID'];
};

export type UpdateReferralPayload = {
  referralRequestId: Scalars['ID'];
  referralState: ReferralState;
  userType: UserType;
  username: Scalars['String'];
};

export type UpdateReferralSettingsInput = {
  eligibleClanIDs: Array<Scalars['ID']>;
  isPublic: Scalars['Boolean'];
  username: Scalars['String'];
};

export type UpdateReferralSettingsPayload = {
  username: Scalars['String'];
};

export type UpdateReferralStateInput = {
  referralRequestId: Scalars['ID'];
  referralState: ReferralState;
  userType: UserType;
  username: Scalars['String'];
};

export type UpdateTodoInput = {
  completed?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type UpdateUserBasicInfoInput = {
  coreSkills?: Maybe<Array<Scalars['ID']>>;
  familiarSkills?: Maybe<Array<Scalars['ID']>>;
  isFresher?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  yearsOfExperience?: Maybe<YearsOfExperienceInput>;
};

export type UpdateUserBasicInfoPayload = {
  user?: Maybe<User>;
};

export type UpdateUserClanInfoInput = {
  resumeUrl?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UpdateUserClanInfoPayload = {
  user?: Maybe<User>;
};

export type UpdateUserJobPreferenceInput = {
  noticePeriod?: Maybe<Scalars['Int']>;
  preferredCTC?: Maybe<Scalars['Int']>;
  preferredLocations?: Maybe<Array<Scalars['String']>>;
  preferredRole?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UpdateUserJobPreferencePayload = {
  user?: Maybe<User>;
};

export type UpdateUserOnboardingBasicInfoInput = {
  coreSkills: Array<Scalars['ID']>;
  email: Scalars['String'];
  familiarSkills: Array<Scalars['ID']>;
  isFresher: Scalars['Boolean'];
  name: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
  yearsOfExperience: YearsOfExperienceInput;
};

export type UpdateUserOnboardingBasicInfoPayload = {
  onboardingUser?: Maybe<OnboardingUser>;
};

export type UpdateUserOnboardingClanInfoInput = {
  currentCompanyInfo?: Maybe<CompanyInfo>;
  currentDesignation?: Maybe<Scalars['String']>;
  education: Array<EducationInfoInput>;
  email: Scalars['String'];
  pastCompaniesInfo?: Maybe<Array<CompanyInfo>>;
  resume: S3PathInput;
};

export type UpdateUserOnboardingClanInfoPayload = {
  onboardingUser?: Maybe<OnboardingUser>;
};

export type UpdateUserOnboardingJobPreferenceInput = {
  email: Scalars['String'];
  invitedByUsername?: Maybe<Scalars['String']>;
  noticePeriod: Scalars['Int'];
  preferredCTC: Scalars['Int'];
  preferredLocations?: Maybe<Array<Scalars['String']>>;
  preferredRole: Scalars['String'];
  signupReason?: Maybe<Scalars['String']>;
};

export type UpdateUserOnboardingJobPreferencePayload = {
  onboardingUser?: Maybe<OnboardingUser>;
};

export type UpdateUserOnboardingProfileInfoInput = {
  codingProfiles?: Maybe<Array<CodingProfileInput>>;
  email: Scalars['String'];
  gender: Gender;
  phoneNumber: Scalars['String'];
  profileHeadline?: Maybe<Scalars['String']>;
  profilePic?: Maybe<S3PathInput>;
};

export type UpdateUserOnboardingProfileInfoPayload = {
  onboardingUser?: Maybe<OnboardingUser>;
};

export type UpdateUserProfileInfoInput = {
  codingProfiles?: Maybe<Array<CodingProfileInput>>;
  gender?: Maybe<Gender>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileHeadline?: Maybe<Scalars['String']>;
  profilePic?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UpdateUserProfileInfoPayload = {
  user?: Maybe<User>;
};

export type User = {
  askedReferrals: AskedReferralConnection;
  clans: Array<Clan>;
  codingProfiles: Array<Maybe<CodingProfile>>;
  educationDetails: EducationDetails;
  email: Scalars['String'];
  gemCount: Scalars['Int'];
  isFresher: Scalars['Boolean'];
  jobPreference: JobPreference;
  name: Scalars['String'];
  personalDetails: PersonalDetails;
  profileHeadline?: Maybe<Scalars['String']>;
  profilePicUrl?: Maybe<Scalars['String']>;
  referralRequests: ReferralRequestConnection;
  referralSettings: ReferralSettings;
  resumeUrl: Scalars['String'];
  role: Scalars['String'];
  skills: Skills;
  username: Scalars['ID'];
  workExperience: WorkExperience;
  yearsOfExperience: YearsOfExperience;
};

export type UserAskedReferralsArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  filters?: Maybe<AskedReferralFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserReferralRequestsArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  filters?: Maybe<ReferralRequestFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum UserType {
  Applicant = 'APPLICANT',
  Referrer = 'REFERRER',
}

export type WorkExperience = {
  currentCompany?: Maybe<Company>;
  currentDesignation?: Maybe<Scalars['String']>;
  pastCompanies?: Maybe<Array<Company>>;
};

export type YearsOfExperience = {
  months: Scalars['Int'];
  years: Scalars['Int'];
};

export type YearsOfExperienceInput = {
  months: Scalars['Int'];
  years: Scalars['Int'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcceptingReferrers: ResolverTypeWrapper<AcceptingReferrers>;
  AcceptingReferrersClanWise: ResolverTypeWrapper<AcceptingReferrersClanWise>;
  AcceptingReferrersPublic: ResolverTypeWrapper<AcceptingReferrersPublic>;
  ApplicantInfo: ResolverTypeWrapper<ApplicantInfo>;
  AskReferralInput: AskReferralInput;
  AskReferralPayload: ResolverTypeWrapper<AskReferralPayload>;
  AskedReferral: ResolverTypeWrapper<AskedReferral>;
  AskedReferralConnection: ResolverTypeWrapper<AskedReferralConnection>;
  AskedReferralEdge: ResolverTypeWrapper<AskedReferralEdge>;
  AskedReferralFilter: AskedReferralFilter;
  AskedReferralStat: ResolverTypeWrapper<AskedReferralStat>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Clan: ResolverTypeWrapper<Clan>;
  ClanType: ClanType;
  CodingProfile: ResolverTypeWrapper<CodingProfile>;
  CodingProfileInput: CodingProfileInput;
  CollegeAutocomplete: ResolverTypeWrapper<CollegeAutocomplete>;
  CollegesAutocompleteResponse: ResolverTypeWrapper<CollegesAutocompleteResponse>;
  CompaniesAutocompleteResponse: ResolverTypeWrapper<CompaniesAutocompleteResponse>;
  Company: ResolverTypeWrapper<Company>;
  CompanyAutocomplete: ResolverTypeWrapper<CompanyAutocomplete>;
  CompanyInfo: CompanyInfo;
  EducationDetails: ResolverTypeWrapper<EducationDetails>;
  EducationInfo: ResolverTypeWrapper<EducationInfo>;
  EducationInfoInput: EducationInfoInput;
  Gender: Gender;
  GetSignedS3URLInput: GetSignedS3UrlInput;
  GetSignedS3URLResponse: ResolverTypeWrapper<GetSignedS3UrlResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Job: ResolverTypeWrapper<Job>;
  JobConnection: ResolverTypeWrapper<JobConnection>;
  JobEdge: ResolverTypeWrapper<JobEdge>;
  JobFilter: JobFilter;
  JobInfo: ResolverTypeWrapper<JobInfo>;
  JobPreference: ResolverTypeWrapper<JobPreference>;
  Mutation: ResolverTypeWrapper<{}>;
  NetworkType: NetworkType;
  OnboardingBasicInfo: ResolverTypeWrapper<OnboardingBasicInfo>;
  OnboardingClanInfo: ResolverTypeWrapper<OnboardingClanInfo>;
  OnboardingJobPreference: ResolverTypeWrapper<OnboardingJobPreference>;
  OnboardingProfileInfo: ResolverTypeWrapper<OnboardingProfileInfo>;
  OnboardingState: OnboardingState;
  OnboardingUser: ResolverTypeWrapper<OnboardingUser>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PersonalDetails: ResolverTypeWrapper<PersonalDetails>;
  PersonalReferralJob: ResolverTypeWrapper<PersonalReferralJob>;
  PersonalReferralJobConnection: ResolverTypeWrapper<PersonalReferralJobConnection>;
  PersonalReferralJobEdge: ResolverTypeWrapper<PersonalReferralJobEdge>;
  PersonalReferralJobFilter: PersonalReferralJobFilter;
  Query: ResolverTypeWrapper<{}>;
  Recency: Recency;
  ReferralRequest: ResolverTypeWrapper<ReferralRequest>;
  ReferralRequestConnection: ResolverTypeWrapper<ReferralRequestConnection>;
  ReferralRequestEdge: ResolverTypeWrapper<ReferralRequestEdge>;
  ReferralRequestFilter: ReferralRequestFilter;
  ReferralSettings: ResolverTypeWrapper<ReferralSettings>;
  ReferralState: ReferralState;
  S3ParamsInput: S3ParamsInput;
  S3Path: ResolverTypeWrapper<S3Path>;
  S3PathInput: S3PathInput;
  S3_OPERATION: S3_Operation;
  Seniority: Seniority;
  Skill: ResolverTypeWrapper<Skill>;
  SkillAutocomplete: ResolverTypeWrapper<SkillAutocomplete>;
  Skills: ResolverTypeWrapper<Skills>;
  SkillsAutocompleteResponse: ResolverTypeWrapper<SkillsAutocompleteResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TodoMVC: ResolverTypeWrapper<TodoMvc>;
  UpdateReferralPayload: ResolverTypeWrapper<UpdateReferralPayload>;
  UpdateReferralSettingsInput: UpdateReferralSettingsInput;
  UpdateReferralSettingsPayload: ResolverTypeWrapper<UpdateReferralSettingsPayload>;
  UpdateReferralStateInput: UpdateReferralStateInput;
  UpdateTodoInput: UpdateTodoInput;
  UpdateUserBasicInfoInput: UpdateUserBasicInfoInput;
  UpdateUserBasicInfoPayload: ResolverTypeWrapper<UpdateUserBasicInfoPayload>;
  UpdateUserClanInfoInput: UpdateUserClanInfoInput;
  UpdateUserClanInfoPayload: ResolverTypeWrapper<UpdateUserClanInfoPayload>;
  UpdateUserJobPreferenceInput: UpdateUserJobPreferenceInput;
  UpdateUserJobPreferencePayload: ResolverTypeWrapper<UpdateUserJobPreferencePayload>;
  UpdateUserOnboardingBasicInfoInput: UpdateUserOnboardingBasicInfoInput;
  UpdateUserOnboardingBasicInfoPayload: ResolverTypeWrapper<UpdateUserOnboardingBasicInfoPayload>;
  UpdateUserOnboardingClanInfoInput: UpdateUserOnboardingClanInfoInput;
  UpdateUserOnboardingClanInfoPayload: ResolverTypeWrapper<UpdateUserOnboardingClanInfoPayload>;
  UpdateUserOnboardingJobPreferenceInput: UpdateUserOnboardingJobPreferenceInput;
  UpdateUserOnboardingJobPreferencePayload: ResolverTypeWrapper<UpdateUserOnboardingJobPreferencePayload>;
  UpdateUserOnboardingProfileInfoInput: UpdateUserOnboardingProfileInfoInput;
  UpdateUserOnboardingProfileInfoPayload: ResolverTypeWrapper<UpdateUserOnboardingProfileInfoPayload>;
  UpdateUserProfileInfoInput: UpdateUserProfileInfoInput;
  UpdateUserProfileInfoPayload: ResolverTypeWrapper<UpdateUserProfileInfoPayload>;
  User: ResolverTypeWrapper<User>;
  UserType: UserType;
  WorkExperience: ResolverTypeWrapper<WorkExperience>;
  YearsOfExperience: ResolverTypeWrapper<YearsOfExperience>;
  YearsOfExperienceInput: YearsOfExperienceInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcceptingReferrers: AcceptingReferrers;
  AcceptingReferrersClanWise: AcceptingReferrersClanWise;
  AcceptingReferrersPublic: AcceptingReferrersPublic;
  ApplicantInfo: ApplicantInfo;
  AskReferralInput: AskReferralInput;
  AskReferralPayload: AskReferralPayload;
  AskedReferral: AskedReferral;
  AskedReferralConnection: AskedReferralConnection;
  AskedReferralEdge: AskedReferralEdge;
  AskedReferralFilter: AskedReferralFilter;
  AskedReferralStat: AskedReferralStat;
  Boolean: Scalars['Boolean'];
  Clan: Clan;
  CodingProfile: CodingProfile;
  CodingProfileInput: CodingProfileInput;
  CollegeAutocomplete: CollegeAutocomplete;
  CollegesAutocompleteResponse: CollegesAutocompleteResponse;
  CompaniesAutocompleteResponse: CompaniesAutocompleteResponse;
  Company: Company;
  CompanyAutocomplete: CompanyAutocomplete;
  CompanyInfo: CompanyInfo;
  EducationDetails: EducationDetails;
  EducationInfo: EducationInfo;
  EducationInfoInput: EducationInfoInput;
  GetSignedS3URLInput: GetSignedS3UrlInput;
  GetSignedS3URLResponse: GetSignedS3UrlResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Job: Job;
  JobConnection: JobConnection;
  JobEdge: JobEdge;
  JobFilter: JobFilter;
  JobInfo: JobInfo;
  JobPreference: JobPreference;
  Mutation: {};
  OnboardingBasicInfo: OnboardingBasicInfo;
  OnboardingClanInfo: OnboardingClanInfo;
  OnboardingJobPreference: OnboardingJobPreference;
  OnboardingProfileInfo: OnboardingProfileInfo;
  OnboardingUser: OnboardingUser;
  PageInfo: PageInfo;
  PersonalDetails: PersonalDetails;
  PersonalReferralJob: PersonalReferralJob;
  PersonalReferralJobConnection: PersonalReferralJobConnection;
  PersonalReferralJobEdge: PersonalReferralJobEdge;
  PersonalReferralJobFilter: PersonalReferralJobFilter;
  Query: {};
  ReferralRequest: ReferralRequest;
  ReferralRequestConnection: ReferralRequestConnection;
  ReferralRequestEdge: ReferralRequestEdge;
  ReferralRequestFilter: ReferralRequestFilter;
  ReferralSettings: ReferralSettings;
  S3ParamsInput: S3ParamsInput;
  S3Path: S3Path;
  S3PathInput: S3PathInput;
  Skill: Skill;
  SkillAutocomplete: SkillAutocomplete;
  Skills: Skills;
  SkillsAutocompleteResponse: SkillsAutocompleteResponse;
  String: Scalars['String'];
  TodoMVC: TodoMvc;
  UpdateReferralPayload: UpdateReferralPayload;
  UpdateReferralSettingsInput: UpdateReferralSettingsInput;
  UpdateReferralSettingsPayload: UpdateReferralSettingsPayload;
  UpdateReferralStateInput: UpdateReferralStateInput;
  UpdateTodoInput: UpdateTodoInput;
  UpdateUserBasicInfoInput: UpdateUserBasicInfoInput;
  UpdateUserBasicInfoPayload: UpdateUserBasicInfoPayload;
  UpdateUserClanInfoInput: UpdateUserClanInfoInput;
  UpdateUserClanInfoPayload: UpdateUserClanInfoPayload;
  UpdateUserJobPreferenceInput: UpdateUserJobPreferenceInput;
  UpdateUserJobPreferencePayload: UpdateUserJobPreferencePayload;
  UpdateUserOnboardingBasicInfoInput: UpdateUserOnboardingBasicInfoInput;
  UpdateUserOnboardingBasicInfoPayload: UpdateUserOnboardingBasicInfoPayload;
  UpdateUserOnboardingClanInfoInput: UpdateUserOnboardingClanInfoInput;
  UpdateUserOnboardingClanInfoPayload: UpdateUserOnboardingClanInfoPayload;
  UpdateUserOnboardingJobPreferenceInput: UpdateUserOnboardingJobPreferenceInput;
  UpdateUserOnboardingJobPreferencePayload: UpdateUserOnboardingJobPreferencePayload;
  UpdateUserOnboardingProfileInfoInput: UpdateUserOnboardingProfileInfoInput;
  UpdateUserOnboardingProfileInfoPayload: UpdateUserOnboardingProfileInfoPayload;
  UpdateUserProfileInfoInput: UpdateUserProfileInfoInput;
  UpdateUserProfileInfoPayload: UpdateUserProfileInfoPayload;
  User: User;
  WorkExperience: WorkExperience;
  YearsOfExperience: YearsOfExperience;
  YearsOfExperienceInput: YearsOfExperienceInput;
};

export type AcceptingReferrersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AcceptingReferrers'] = ResolversParentTypes['AcceptingReferrers']
> = {
  acceptingReferrersClanWise?: Resolver<
    Array<ResolversTypes['AcceptingReferrersClanWise']>,
    ParentType,
    ContextType
  >;
  acceptingReferrersPublic?: Resolver<
    ResolversTypes['AcceptingReferrersPublic'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AcceptingReferrersClanWiseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AcceptingReferrersClanWise'] = ResolversParentTypes['AcceptingReferrersClanWise']
> = {
  clanInfo?: Resolver<ResolversTypes['Clan'], ParentType, ContextType>;
  userCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AcceptingReferrersPublicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AcceptingReferrersPublic'] = ResolversParentTypes['AcceptingReferrersPublic']
> = {
  userCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicantInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ApplicantInfo'] = ResolversParentTypes['ApplicantInfo']
> = {
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentDesignation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latestCollegeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  networkType?: Resolver<ResolversTypes['NetworkType'], ParentType, ContextType>;
  profilePicUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resumeUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearsOfExperience?: Resolver<ResolversTypes['YearsOfExperience'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AskReferralPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AskReferralPayload'] = ResolversParentTypes['AskReferralPayload']
> = {
  jobId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AskedReferralResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AskedReferral'] = ResolversParentTypes['AskedReferral']
> = {
  acceptedReferrers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  appliedOn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  askedReferralStats?: Resolver<
    Array<ResolversTypes['AskedReferralStat']>,
    ParentType,
    ContextType
  >;
  jobInfo?: Resolver<ResolversTypes['JobInfo'], ParentType, ContextType>;
  referralState?: Resolver<ResolversTypes['ReferralState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AskedReferralConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AskedReferralConnection'] = ResolversParentTypes['AskedReferralConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AskedReferralEdge']>>>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['AskedReferral']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AskedReferralEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AskedReferralEdge'] = ResolversParentTypes['AskedReferralEdge']
> = {
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AskedReferral'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AskedReferralStatResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AskedReferralStat'] = ResolversParentTypes['AskedReferralStat']
> = {
  referralState?: Resolver<ResolversTypes['ReferralState'], ParentType, ContextType>;
  referrerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Clan'] = ResolversParentTypes['Clan']
> = {
  clanType?: Resolver<ResolversTypes['ClanType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CodingProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CodingProfile'] = ResolversParentTypes['CodingProfile']
> = {
  platformName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollegeAutocompleteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CollegeAutocomplete'] = ResolversParentTypes['CollegeAutocomplete']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollegesAutocompleteResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CollegesAutocompleteResponse'] = ResolversParentTypes['CollegesAutocompleteResponse']
> = {
  colleges?: Resolver<Array<ResolversTypes['CollegeAutocomplete']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompaniesAutocompleteResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CompaniesAutocompleteResponse'] = ResolversParentTypes['CompaniesAutocompleteResponse']
> = {
  companies?: Resolver<Array<ResolversTypes['CompanyAutocomplete']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']
> = {
  clanId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyAutocompleteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CompanyAutocomplete'] = ResolversParentTypes['CompanyAutocomplete']
> = {
  logoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EducationDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EducationDetails'] = ResolversParentTypes['EducationDetails']
> = {
  education?: Resolver<Array<ResolversTypes['EducationInfo']>, ParentType, ContextType>;
  latestCollegeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EducationInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EducationInfo'] = ResolversParentTypes['EducationInfo']
> = {
  clanId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  degree?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specialization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearOfGraduation?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetSignedS3UrlResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetSignedS3URLResponse'] = ResolversParentTypes['GetSignedS3URLResponse']
> = {
  signedURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']
> = {
  acceptingReferrers?: Resolver<
    ResolversTypes['AcceptingReferrers'],
    ParentType,
    ContextType,
    RequireFields<JobAcceptingReferrersArgs, 'username'>
  >;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  hasAlreadyRequested?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<JobHasAlreadyRequestedArgs, 'username'>
  >;
  hasEnoughGems?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  linkedInUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkedinJobId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postedDate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recency?: Resolver<ResolversTypes['Recency'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seniority?: Resolver<Maybe<ResolversTypes['Seniority']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['JobConnection'] = ResolversParentTypes['JobConnection']
> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['JobEdge']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['JobEdge'] = ResolversParentTypes['JobEdge']
> = {
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Job'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['JobInfo'] = ResolversParentTypes['JobInfo']
> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  jobLocation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobRole?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkedinJobId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobPreferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['JobPreference'] = ResolversParentTypes['JobPreference']
> = {
  noticePeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  preferredCTC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  preferredLocations?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  preferredRole?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  askReferral?: Resolver<
    Maybe<ResolversTypes['AskReferralPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationAskReferralArgs, 'input'>
  >;
  createTodo?: Resolver<
    ResolversTypes['TodoMVC'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTodoArgs, 'description'>
  >;
  getCollegesAutocomplete?: Resolver<
    ResolversTypes['CollegesAutocompleteResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationGetCollegesAutocompleteArgs, 'prefix'>
  >;
  getCompaniesAutocomplete?: Resolver<
    ResolversTypes['CompaniesAutocompleteResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationGetCompaniesAutocompleteArgs, 'prefix'>
  >;
  getSignedS3URL?: Resolver<
    ResolversTypes['GetSignedS3URLResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationGetSignedS3UrlArgs, 'input'>
  >;
  getSkillsAutocomplete?: Resolver<
    ResolversTypes['SkillsAutocompleteResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationGetSkillsAutocompleteArgs, 'prefix'>
  >;
  isUsernameAvailable?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationIsUsernameAvailableArgs, 'input'>
  >;
  updateReferralSettings?: Resolver<
    Maybe<ResolversTypes['UpdateReferralSettingsPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateReferralSettingsArgs, 'input'>
  >;
  updateReferralState?: Resolver<
    Maybe<ResolversTypes['UpdateReferralPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateReferralStateArgs, 'input'>
  >;
  updateTodo?: Resolver<
    Maybe<ResolversTypes['TodoMVC']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTodoArgs, 'data' | 'todoId'>
  >;
  updateUserBasicInfo?: Resolver<
    Maybe<ResolversTypes['UpdateUserBasicInfoPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserBasicInfoArgs, 'input'>
  >;
  updateUserClanInfo?: Resolver<
    Maybe<ResolversTypes['UpdateUserClanInfoPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserClanInfoArgs, 'input'>
  >;
  updateUserJobPreference?: Resolver<
    Maybe<ResolversTypes['UpdateUserJobPreferencePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserJobPreferenceArgs, 'input'>
  >;
  updateUserOnboardingBasicInfo?: Resolver<
    Maybe<ResolversTypes['UpdateUserOnboardingBasicInfoPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserOnboardingBasicInfoArgs, 'input'>
  >;
  updateUserOnboardingClanInfo?: Resolver<
    Maybe<ResolversTypes['UpdateUserOnboardingClanInfoPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserOnboardingClanInfoArgs, 'input'>
  >;
  updateUserOnboardingJobPreference?: Resolver<
    Maybe<ResolversTypes['UpdateUserOnboardingJobPreferencePayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserOnboardingJobPreferenceArgs, 'input'>
  >;
  updateUserOnboardingProfileInfo?: Resolver<
    Maybe<ResolversTypes['UpdateUserOnboardingProfileInfoPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserOnboardingProfileInfoArgs, 'input'>
  >;
  updateUserProfileInfo?: Resolver<
    Maybe<ResolversTypes['UpdateUserProfileInfoPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserProfileInfoArgs, 'input'>
  >;
};

export type OnboardingBasicInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OnboardingBasicInfo'] = ResolversParentTypes['OnboardingBasicInfo']
> = {
  isFresher?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skills?: Resolver<ResolversTypes['Skills'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  yearsOfExperience?: Resolver<ResolversTypes['YearsOfExperience'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnboardingClanInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OnboardingClanInfo'] = ResolversParentTypes['OnboardingClanInfo']
> = {
  currentCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  currentDesignation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  education?: Resolver<Array<ResolversTypes['EducationInfo']>, ParentType, ContextType>;
  pastCompanies?: Resolver<Maybe<Array<ResolversTypes['Company']>>, ParentType, ContextType>;
  resumeUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnboardingJobPreferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OnboardingJobPreference'] = ResolversParentTypes['OnboardingJobPreference']
> = {
  invitedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noticePeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  preferredCTC?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  preferredLocations?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  preferredRole?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signupReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnboardingProfileInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OnboardingProfileInfo'] = ResolversParentTypes['OnboardingProfileInfo']
> = {
  codingProfiles?: Resolver<Maybe<Array<ResolversTypes['CodingProfile']>>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileHeadline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePicUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OnboardingUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OnboardingUser'] = ResolversParentTypes['OnboardingUser']
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isFresher?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastCompletedState?: Resolver<ResolversTypes['OnboardingState'], ParentType, ContextType>;
  onboardingBasicInfo?: Resolver<
    Maybe<ResolversTypes['OnboardingBasicInfo']>,
    ParentType,
    ContextType
  >;
  onboardingClanInfo?: Resolver<
    Maybe<ResolversTypes['OnboardingClanInfo']>,
    ParentType,
    ContextType
  >;
  onboardingJobPreference?: Resolver<
    Maybe<ResolversTypes['OnboardingJobPreference']>,
    ParentType,
    ContextType
  >;
  onboardingProfileInfo?: Resolver<
    Maybe<ResolversTypes['OnboardingProfileInfo']>,
    ParentType,
    ContextType
  >;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonalDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PersonalDetails'] = ResolversParentTypes['PersonalDetails']
> = {
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  invitedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signUpReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonalReferralJobResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PersonalReferralJob'] = ResolversParentTypes['PersonalReferralJob']
> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  hasAlreadyPersonallyRequested?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<PersonalReferralJobHasAlreadyPersonallyRequestedArgs, 'applicantUsername'>
  >;
  hasEnoughGems?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<PersonalReferralJobHasEnoughGemsArgs, 'applicantUsername'>
  >;
  isEligible?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<PersonalReferralJobIsEligibleArgs, 'applicantUsername'>
  >;
  linkedInUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  linkedinJobId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postedDate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recency?: Resolver<ResolversTypes['Recency'], ParentType, ContextType>;
  referralSettings?: Resolver<ResolversTypes['ReferralSettings'], ParentType, ContextType>;
  referrerUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seniority?: Resolver<Maybe<ResolversTypes['Seniority']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonalReferralJobConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PersonalReferralJobConnection'] = ResolversParentTypes['PersonalReferralJobConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PersonalReferralJobEdge']>>>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PersonalReferralJob']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PersonalReferralJobEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PersonalReferralJobEdge'] = ResolversParentTypes['PersonalReferralJobEdge']
> = {
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PersonalReferralJob'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  Todo?: Resolver<
    Maybe<ResolversTypes['TodoMVC']>,
    ParentType,
    ContextType,
    RequireFields<QueryTodoArgs, 'todoId'>
  >;
  allTodos?: Resolver<Array<ResolversTypes['TodoMVC']>, ParentType, ContextType>;
  jobs?: Resolver<
    ResolversTypes['JobConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryJobsArgs, 'username'>
  >;
  onboardingUser?: Resolver<
    Maybe<ResolversTypes['OnboardingUser']>,
    ParentType,
    ContextType,
    RequireFields<QueryOnboardingUserArgs, 'email'>
  >;
  personalReferralJobs?: Resolver<
    ResolversTypes['PersonalReferralJobConnection'],
    ParentType,
    ContextType,
    RequireFields<QueryPersonalReferralJobsArgs, 'referrerUsername'>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'username'>
  >;
};

export type ReferralRequestResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ReferralRequest'] = ResolversParentTypes['ReferralRequest']
> = {
  applicantInfo?: Resolver<ResolversTypes['ApplicantInfo'], ParentType, ContextType>;
  appliedOn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  jobInfo?: Resolver<ResolversTypes['JobInfo'], ParentType, ContextType>;
  referralState?: Resolver<ResolversTypes['ReferralState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferralRequestConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ReferralRequestConnection'] = ResolversParentTypes['ReferralRequestConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ReferralRequestEdge']>>>,
    ParentType,
    ContextType
  >;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReferralRequest']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferralRequestEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ReferralRequestEdge'] = ResolversParentTypes['ReferralRequestEdge']
> = {
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ReferralRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferralSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ReferralSettings'] = ResolversParentTypes['ReferralSettings']
> = {
  eligibleClans?: Resolver<Maybe<Array<ResolversTypes['Clan']>>, ParentType, ContextType>;
  isPublic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type S3PathResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['S3Path'] = ResolversParentTypes['S3Path']
> = {
  bucket?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillAutocompleteResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SkillAutocomplete'] = ResolversParentTypes['SkillAutocomplete']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Skills'] = ResolversParentTypes['Skills']
> = {
  coreSkills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  familiarSkills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SkillsAutocompleteResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SkillsAutocompleteResponse'] = ResolversParentTypes['SkillsAutocompleteResponse']
> = {
  skills?: Resolver<Array<ResolversTypes['SkillAutocomplete']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoMvcResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TodoMVC'] = ResolversParentTypes['TodoMVC']
> = {
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todoId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateReferralPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateReferralPayload'] = ResolversParentTypes['UpdateReferralPayload']
> = {
  referralRequestId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  referralState?: Resolver<ResolversTypes['ReferralState'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateReferralSettingsPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateReferralSettingsPayload'] = ResolversParentTypes['UpdateReferralSettingsPayload']
> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserBasicInfoPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserBasicInfoPayload'] = ResolversParentTypes['UpdateUserBasicInfoPayload']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserClanInfoPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserClanInfoPayload'] = ResolversParentTypes['UpdateUserClanInfoPayload']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserJobPreferencePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserJobPreferencePayload'] = ResolversParentTypes['UpdateUserJobPreferencePayload']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserOnboardingBasicInfoPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserOnboardingBasicInfoPayload'] = ResolversParentTypes['UpdateUserOnboardingBasicInfoPayload']
> = {
  onboardingUser?: Resolver<Maybe<ResolversTypes['OnboardingUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserOnboardingClanInfoPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserOnboardingClanInfoPayload'] = ResolversParentTypes['UpdateUserOnboardingClanInfoPayload']
> = {
  onboardingUser?: Resolver<Maybe<ResolversTypes['OnboardingUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserOnboardingJobPreferencePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserOnboardingJobPreferencePayload'] = ResolversParentTypes['UpdateUserOnboardingJobPreferencePayload']
> = {
  onboardingUser?: Resolver<Maybe<ResolversTypes['OnboardingUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserOnboardingProfileInfoPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserOnboardingProfileInfoPayload'] = ResolversParentTypes['UpdateUserOnboardingProfileInfoPayload']
> = {
  onboardingUser?: Resolver<Maybe<ResolversTypes['OnboardingUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserProfileInfoPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateUserProfileInfoPayload'] = ResolversParentTypes['UpdateUserProfileInfoPayload']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  askedReferrals?: Resolver<
    ResolversTypes['AskedReferralConnection'],
    ParentType,
    ContextType,
    RequireFields<UserAskedReferralsArgs, never>
  >;
  clans?: Resolver<Array<ResolversTypes['Clan']>, ParentType, ContextType>;
  codingProfiles?: Resolver<Array<Maybe<ResolversTypes['CodingProfile']>>, ParentType, ContextType>;
  educationDetails?: Resolver<ResolversTypes['EducationDetails'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gemCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isFresher?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  jobPreference?: Resolver<ResolversTypes['JobPreference'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  personalDetails?: Resolver<ResolversTypes['PersonalDetails'], ParentType, ContextType>;
  profileHeadline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePicUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  referralRequests?: Resolver<
    ResolversTypes['ReferralRequestConnection'],
    ParentType,
    ContextType,
    RequireFields<UserReferralRequestsArgs, never>
  >;
  referralSettings?: Resolver<ResolversTypes['ReferralSettings'], ParentType, ContextType>;
  resumeUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skills?: Resolver<ResolversTypes['Skills'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workExperience?: Resolver<ResolversTypes['WorkExperience'], ParentType, ContextType>;
  yearsOfExperience?: Resolver<ResolversTypes['YearsOfExperience'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkExperienceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WorkExperience'] = ResolversParentTypes['WorkExperience']
> = {
  currentCompany?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  currentDesignation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pastCompanies?: Resolver<Maybe<Array<ResolversTypes['Company']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearsOfExperienceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['YearsOfExperience'] = ResolversParentTypes['YearsOfExperience']
> = {
  months?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  years?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AcceptingReferrers?: AcceptingReferrersResolvers<ContextType>;
  AcceptingReferrersClanWise?: AcceptingReferrersClanWiseResolvers<ContextType>;
  AcceptingReferrersPublic?: AcceptingReferrersPublicResolvers<ContextType>;
  ApplicantInfo?: ApplicantInfoResolvers<ContextType>;
  AskReferralPayload?: AskReferralPayloadResolvers<ContextType>;
  AskedReferral?: AskedReferralResolvers<ContextType>;
  AskedReferralConnection?: AskedReferralConnectionResolvers<ContextType>;
  AskedReferralEdge?: AskedReferralEdgeResolvers<ContextType>;
  AskedReferralStat?: AskedReferralStatResolvers<ContextType>;
  Clan?: ClanResolvers<ContextType>;
  CodingProfile?: CodingProfileResolvers<ContextType>;
  CollegeAutocomplete?: CollegeAutocompleteResolvers<ContextType>;
  CollegesAutocompleteResponse?: CollegesAutocompleteResponseResolvers<ContextType>;
  CompaniesAutocompleteResponse?: CompaniesAutocompleteResponseResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanyAutocomplete?: CompanyAutocompleteResolvers<ContextType>;
  EducationDetails?: EducationDetailsResolvers<ContextType>;
  EducationInfo?: EducationInfoResolvers<ContextType>;
  GetSignedS3URLResponse?: GetSignedS3UrlResponseResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  JobConnection?: JobConnectionResolvers<ContextType>;
  JobEdge?: JobEdgeResolvers<ContextType>;
  JobInfo?: JobInfoResolvers<ContextType>;
  JobPreference?: JobPreferenceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OnboardingBasicInfo?: OnboardingBasicInfoResolvers<ContextType>;
  OnboardingClanInfo?: OnboardingClanInfoResolvers<ContextType>;
  OnboardingJobPreference?: OnboardingJobPreferenceResolvers<ContextType>;
  OnboardingProfileInfo?: OnboardingProfileInfoResolvers<ContextType>;
  OnboardingUser?: OnboardingUserResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PersonalDetails?: PersonalDetailsResolvers<ContextType>;
  PersonalReferralJob?: PersonalReferralJobResolvers<ContextType>;
  PersonalReferralJobConnection?: PersonalReferralJobConnectionResolvers<ContextType>;
  PersonalReferralJobEdge?: PersonalReferralJobEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReferralRequest?: ReferralRequestResolvers<ContextType>;
  ReferralRequestConnection?: ReferralRequestConnectionResolvers<ContextType>;
  ReferralRequestEdge?: ReferralRequestEdgeResolvers<ContextType>;
  ReferralSettings?: ReferralSettingsResolvers<ContextType>;
  S3Path?: S3PathResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  SkillAutocomplete?: SkillAutocompleteResolvers<ContextType>;
  Skills?: SkillsResolvers<ContextType>;
  SkillsAutocompleteResponse?: SkillsAutocompleteResponseResolvers<ContextType>;
  TodoMVC?: TodoMvcResolvers<ContextType>;
  UpdateReferralPayload?: UpdateReferralPayloadResolvers<ContextType>;
  UpdateReferralSettingsPayload?: UpdateReferralSettingsPayloadResolvers<ContextType>;
  UpdateUserBasicInfoPayload?: UpdateUserBasicInfoPayloadResolvers<ContextType>;
  UpdateUserClanInfoPayload?: UpdateUserClanInfoPayloadResolvers<ContextType>;
  UpdateUserJobPreferencePayload?: UpdateUserJobPreferencePayloadResolvers<ContextType>;
  UpdateUserOnboardingBasicInfoPayload?: UpdateUserOnboardingBasicInfoPayloadResolvers<ContextType>;
  UpdateUserOnboardingClanInfoPayload?: UpdateUserOnboardingClanInfoPayloadResolvers<ContextType>;
  UpdateUserOnboardingJobPreferencePayload?: UpdateUserOnboardingJobPreferencePayloadResolvers<ContextType>;
  UpdateUserOnboardingProfileInfoPayload?: UpdateUserOnboardingProfileInfoPayloadResolvers<ContextType>;
  UpdateUserProfileInfoPayload?: UpdateUserProfileInfoPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WorkExperience?: WorkExperienceResolvers<ContextType>;
  YearsOfExperience?: YearsOfExperienceResolvers<ContextType>;
};

export type IndexQueryVariables = Exact<{ [key: string]: never }>;

export type IndexQuery = { allTodos: Array<{ todoId: string }> };

export type FetchAskedReferralsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  username: Scalars['ID'];
  filters?: Maybe<AskedReferralFilter>;
}>;

export type FetchAskedReferralsQuery = {
  user: {
    username: string;
    askedReferrals: {
      totalCount: number;
      pageInfo: { endCursor?: Maybe<string>; hasNextPage: boolean };
      edges?: Maybe<
        Array<
          Maybe<{
            cursor: string;
            node: {
              appliedOn: number;
              referralState: ReferralState;
              acceptedReferrers?: Maybe<Array<string>>;
              jobInfo: {
                jobUrl: string;
                jobRole: string;
                jobLocation: string;
                company: { name: string; logoUrl: string };
              };
              askedReferralStats: Array<{ referralState: ReferralState; referrerCount: number }>;
            };
          }>
        >
      >;
    };
  };
};

export type UpdateReferralStateMutationVariables = Exact<{
  updateReferralStateInput: UpdateReferralStateInput;
}>;

export type UpdateReferralStateMutation = {
  updateReferralState?: Maybe<{
    userType: UserType;
    username: string;
    referralState: ReferralState;
  }>;
};

export type AskReferralMutationVariables = Exact<{
  askReferralInput: AskReferralInput;
}>;

export type AskReferralMutation = {
  askReferral?: Maybe<{ jobId?: Maybe<string>; username?: Maybe<string> }>;
};

export type JobsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
  filters?: Maybe<JobFilter>;
}>;

export type JobsQuery = {
  jobs: {
    totalCount: number;
    pageInfo: { endCursor?: Maybe<string>; hasNextPage: boolean };
    edges?: Maybe<
      Array<
        Maybe<{
          cursor: string;
          node: {
            role: string;
            location: string;
            url?: Maybe<string>;
            recency: Recency;
            postedDate: number;
            seniority?: Maybe<Seniority>;
            hasEnoughGems: boolean;
            hasAlreadyRequested: boolean;
            company: { id: string; name: string; logoUrl: string };
            acceptingReferrers: {
              acceptingReferrersPublic: {
                userCount: number;
                users?: Maybe<
                  Array<{ username: string; name: string; profilePicUrl?: Maybe<string> }>
                >;
              };
              acceptingReferrersClanWise: Array<{
                userCount: number;
                users?: Maybe<
                  Array<{ name: string; username: string; profilePicUrl?: Maybe<string> }>
                >;
                clanInfo: { id: string; name: string };
              }>;
            };
          };
        }>
      >
    >;
  };
};

export type UserGemsQueryVariables = Exact<{
  username: Scalars['ID'];
}>;

export type UserGemsQuery = {
  user: { username: string; name: string; profilePicUrl?: Maybe<string>; gemCount: number };
};

export type UpdateUserOnboardingBasicInfoMutationVariables = Exact<{
  updateUserOnboardingBasicInfoInput: UpdateUserOnboardingBasicInfoInput;
}>;

export type UpdateUserOnboardingBasicInfoMutation = {
  updateUserOnboardingBasicInfo?: Maybe<{
    onboardingUser?: Maybe<{ email: string; lastCompletedState: OnboardingState }>;
  }>;
};

export type GetSkillsAutocompleteMutationVariables = Exact<{
  prefix: Scalars['String'];
}>;

export type GetSkillsAutocompleteMutation = {
  getSkillsAutocomplete: { skills: Array<{ id: string; name: string; logoUrl: string }> };
};

export type IsUsernameAvailableMutationVariables = Exact<{
  username: Scalars['String'];
}>;

export type IsUsernameAvailableMutation = { isUsernameAvailable: boolean };

export type UpdateUserOnboardingClanInfoMutationVariables = Exact<{
  updateUserOnboardingClanInfoInput: UpdateUserOnboardingClanInfoInput;
}>;

export type UpdateUserOnboardingClanInfoMutation = {
  updateUserOnboardingClanInfo?: Maybe<{
    onboardingUser?: Maybe<{ email: string; lastCompletedState: OnboardingState }>;
  }>;
};

export type GetCompaniesAutocompleteMutationVariables = Exact<{
  prefix: Scalars['String'];
}>;

export type GetCompaniesAutocompleteMutation = {
  getCompaniesAutocomplete: { companies: Array<{ name: string; logoUrl: string }> };
};

export type GetCollegesAutocompleteMutationVariables = Exact<{
  prefix: Scalars['String'];
}>;

export type GetCollegesAutocompleteMutation = {
  getCollegesAutocomplete: { colleges: Array<{ id: string; name: string }> };
};

export type UpdateUserOnboardingJobPreferenceMutationVariables = Exact<{
  updateUserOnboardingJobPreferenceInput: UpdateUserOnboardingJobPreferenceInput;
}>;

export type UpdateUserOnboardingJobPreferenceMutation = {
  updateUserOnboardingJobPreference?: Maybe<{
    onboardingUser?: Maybe<{ email: string; lastCompletedState: OnboardingState }>;
  }>;
};

export type UpdateUserOnboardingProfileInfoMutationVariables = Exact<{
  updateUserOnboardingProfileInfoInput: UpdateUserOnboardingProfileInfoInput;
}>;

export type UpdateUserOnboardingProfileInfoMutation = {
  updateUserOnboardingProfileInfo?: Maybe<{
    onboardingUser?: Maybe<{ email: string; lastCompletedState: OnboardingState }>;
  }>;
};

export type PersonalReferralLinkJobsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  referrerUsername: Scalars['String'];
  applicantUsername: Scalars['String'];
  filters?: Maybe<PersonalReferralJobFilter>;
}>;

export type PersonalReferralLinkJobsQuery = {
  personalReferralJobs: {
    totalCount: number;
    pageInfo: { endCursor?: Maybe<string>; hasNextPage: boolean };
    edges?: Maybe<
      Array<
        Maybe<{
          cursor: string;
          node: {
            role: string;
            location: string;
            url?: Maybe<string>;
            recency: Recency;
            postedDate: number;
            seniority?: Maybe<Seniority>;
            hasAlreadyPersonallyRequested: boolean;
            isEligible: boolean;
            hasEnoughGems: boolean;
            company: { id: string; name: string; logoUrl: string };
          };
        }>
      >
    >;
  };
};

export type FetchReferralRequestsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  username: Scalars['ID'];
  filters?: Maybe<ReferralRequestFilter>;
}>;

export type FetchReferralRequestsQuery = {
  user: {
    username: string;
    referralRequests: {
      totalCount: number;
      pageInfo: { endCursor?: Maybe<string>; hasNextPage: boolean };
      edges?: Maybe<
        Array<
          Maybe<{
            cursor: string;
            node: {
              referralState: ReferralState;
              appliedOn: number;
              jobInfo: {
                jobUrl: string;
                jobRole: string;
                jobLocation: string;
                company: { name: string; logoUrl: string };
              };
              applicantInfo: {
                name: string;
                networkType: NetworkType;
                profilePicUrl?: Maybe<string>;
                resumeUrl: string;
                latestCollegeName: string;
                currentDesignation?: Maybe<string>;
                companyName?: Maybe<string>;
                yearsOfExperience: { months: number; years: number };
              };
            };
          }>
        >
      >;
    };
  };
};

export type UpdateReferralSettingsMutationVariables = Exact<{
  updateReferralSettingsInput: UpdateReferralSettingsInput;
}>;

export type UpdateReferralSettingsMutation = {
  updateReferralSettings?: Maybe<{ username: string }>;
};

export type UserQueryVariables = Exact<{
  username: Scalars['ID'];
}>;

export type UserQuery = {
  user: {
    username: string;
    clans: Array<{ name: string; id: string }>;
    workExperience: { currentCompany?: Maybe<{ id: string; name: string }> };
    referralSettings: {
      isPublic?: Maybe<boolean>;
      eligibleClans?: Maybe<Array<{ id: string; name: string; logoUrl?: Maybe<string> }>>;
    };
  };
};

export type PersonalReferralSettingsJobsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['ID']>;
  referrerUsername: Scalars['String'];
  filters?: Maybe<PersonalReferralJobFilter>;
}>;

export type PersonalReferralSettingsJobsQuery = {
  personalReferralJobs: {
    totalCount: number;
    pageInfo: { endCursor?: Maybe<string>; hasNextPage: boolean };
    edges?: Maybe<
      Array<
        Maybe<{
          cursor: string;
          node: {
            role: string;
            location: string;
            url?: Maybe<string>;
            recency: Recency;
            postedDate: number;
            seniority?: Maybe<Seniority>;
            company: { id: string; name: string; logoUrl: string };
          };
        }>
      >
    >;
  };
};

export type TodoQueryVariables = Exact<{
  todoId: Scalars['ID'];
}>;

export type TodoQuery = { Todo?: Maybe<{ description: string; completed: boolean }> };

export type UpdateTodoMutationVariables = Exact<{
  todoId: Scalars['ID'];
  data: UpdateTodoInput;
}>;

export type UpdateTodoMutation = {
  updateTodo?: Maybe<{ description: string; completed: boolean }>;
};

export const IndexDocument = gql`
  query Index {
    allTodos {
      todoId
    }
  }
`;

/**
 * __useIndexQuery__
 *
 * To run a query within a React component, call `useIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<IndexQuery, IndexQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<IndexQuery, IndexQueryVariables>(IndexDocument, options);
}
export function useIndexLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IndexQuery, IndexQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<IndexQuery, IndexQueryVariables>(IndexDocument, options);
}
export type IndexQueryHookResult = ReturnType<typeof useIndexQuery>;
export type IndexLazyQueryHookResult = ReturnType<typeof useIndexLazyQuery>;
export type IndexQueryResult = ApolloReactCommon.QueryResult<IndexQuery, IndexQueryVariables>;
export const FetchAskedReferralsDocument = gql`
  query fetchAskedReferrals(
    $first: Int
    $after: ID
    $username: ID!
    $filters: AskedReferralFilter
  ) {
    user(username: $username) {
      username
      askedReferrals(first: $first, after: $after, filters: $filters) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            jobInfo {
              jobUrl
              jobRole
              jobLocation
              company {
                name
                logoUrl
              }
            }
            appliedOn
            referralState
            askedReferralStats {
              referralState
              referrerCount
            }
            acceptedReferrers
          }
        }
      }
    }
  }
`;

/**
 * __useFetchAskedReferralsQuery__
 *
 * To run a query within a React component, call `useFetchAskedReferralsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAskedReferralsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAskedReferralsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      username: // value for 'username'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchAskedReferralsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    FetchAskedReferralsQuery,
    FetchAskedReferralsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<FetchAskedReferralsQuery, FetchAskedReferralsQueryVariables>(
    FetchAskedReferralsDocument,
    options
  );
}
export function useFetchAskedReferralsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchAskedReferralsQuery,
    FetchAskedReferralsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<FetchAskedReferralsQuery, FetchAskedReferralsQueryVariables>(
    FetchAskedReferralsDocument,
    options
  );
}
export type FetchAskedReferralsQueryHookResult = ReturnType<typeof useFetchAskedReferralsQuery>;
export type FetchAskedReferralsLazyQueryHookResult = ReturnType<
  typeof useFetchAskedReferralsLazyQuery
>;
export type FetchAskedReferralsQueryResult = ApolloReactCommon.QueryResult<
  FetchAskedReferralsQuery,
  FetchAskedReferralsQueryVariables
>;
export const UpdateReferralStateDocument = gql`
  mutation updateReferralState($updateReferralStateInput: UpdateReferralStateInput!) {
    updateReferralState(input: $updateReferralStateInput) {
      userType
      username
      referralState
    }
  }
`;
export type UpdateReferralStateMutationFn = ApolloReactCommon.MutationFunction<
  UpdateReferralStateMutation,
  UpdateReferralStateMutationVariables
>;

/**
 * __useUpdateReferralStateMutation__
 *
 * To run a mutation, you first call `useUpdateReferralStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReferralStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReferralStateMutation, { data, loading, error }] = useUpdateReferralStateMutation({
 *   variables: {
 *      updateReferralStateInput: // value for 'updateReferralStateInput'
 *   },
 * });
 */
export function useUpdateReferralStateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateReferralStateMutation,
    UpdateReferralStateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateReferralStateMutation,
    UpdateReferralStateMutationVariables
  >(UpdateReferralStateDocument, options);
}
export type UpdateReferralStateMutationHookResult = ReturnType<
  typeof useUpdateReferralStateMutation
>;
export type UpdateReferralStateMutationResult =
  ApolloReactCommon.MutationResult<UpdateReferralStateMutation>;
export type UpdateReferralStateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateReferralStateMutation,
  UpdateReferralStateMutationVariables
>;
export const AskReferralDocument = gql`
  mutation askReferral($askReferralInput: AskReferralInput!) {
    askReferral(input: $askReferralInput) {
      jobId
      username
    }
  }
`;
export type AskReferralMutationFn = ApolloReactCommon.MutationFunction<
  AskReferralMutation,
  AskReferralMutationVariables
>;

/**
 * __useAskReferralMutation__
 *
 * To run a mutation, you first call `useAskReferralMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskReferralMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askReferralMutation, { data, loading, error }] = useAskReferralMutation({
 *   variables: {
 *      askReferralInput: // value for 'askReferralInput'
 *   },
 * });
 */
export function useAskReferralMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AskReferralMutation,
    AskReferralMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<AskReferralMutation, AskReferralMutationVariables>(
    AskReferralDocument,
    options
  );
}
export type AskReferralMutationHookResult = ReturnType<typeof useAskReferralMutation>;
export type AskReferralMutationResult = ApolloReactCommon.MutationResult<AskReferralMutation>;
export type AskReferralMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AskReferralMutation,
  AskReferralMutationVariables
>;
export const JobsDocument = gql`
  query jobs($first: Int, $after: ID, $username: String!, $filters: JobFilter) {
    jobs(first: $first, after: $after, username: $username, filters: $filters) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          role
          company {
            id
            name
            logoUrl
          }
          location
          url
          recency
          postedDate
          seniority
          hasEnoughGems
          hasAlreadyRequested(username: $username)
          acceptingReferrers(username: $username) {
            acceptingReferrersPublic {
              userCount
              users {
                username
                name
                profilePicUrl
              }
            }
            acceptingReferrersClanWise {
              users {
                name
                username
                profilePicUrl
              }
              clanInfo {
                id
                name
              }
              userCount
            }
          }
        }
      }
    }
  }
`;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      username: // value for 'username'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useJobsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<JobsQuery, JobsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
}
export function useJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
}
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = ApolloReactCommon.QueryResult<JobsQuery, JobsQueryVariables>;
export const UserGemsDocument = gql`
  query userGems($username: ID!) {
    user(username: $username) {
      username
      name
      profilePicUrl
      gemCount
    }
  }
`;

/**
 * __useUserGemsQuery__
 *
 * To run a query within a React component, call `useUserGemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGemsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserGemsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<UserGemsQuery, UserGemsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<UserGemsQuery, UserGemsQueryVariables>(
    UserGemsDocument,
    options
  );
}
export function useUserGemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserGemsQuery, UserGemsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<UserGemsQuery, UserGemsQueryVariables>(
    UserGemsDocument,
    options
  );
}
export type UserGemsQueryHookResult = ReturnType<typeof useUserGemsQuery>;
export type UserGemsLazyQueryHookResult = ReturnType<typeof useUserGemsLazyQuery>;
export type UserGemsQueryResult = ApolloReactCommon.QueryResult<
  UserGemsQuery,
  UserGemsQueryVariables
>;
export const UpdateUserOnboardingBasicInfoDocument = gql`
  mutation updateUserOnboardingBasicInfo(
    $updateUserOnboardingBasicInfoInput: UpdateUserOnboardingBasicInfoInput!
  ) {
    updateUserOnboardingBasicInfo(input: $updateUserOnboardingBasicInfoInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;
export type UpdateUserOnboardingBasicInfoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserOnboardingBasicInfoMutation,
  UpdateUserOnboardingBasicInfoMutationVariables
>;

/**
 * __useUpdateUserOnboardingBasicInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserOnboardingBasicInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnboardingBasicInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOnboardingBasicInfoMutation, { data, loading, error }] = useUpdateUserOnboardingBasicInfoMutation({
 *   variables: {
 *      updateUserOnboardingBasicInfoInput: // value for 'updateUserOnboardingBasicInfoInput'
 *   },
 * });
 */
export function useUpdateUserOnboardingBasicInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserOnboardingBasicInfoMutation,
    UpdateUserOnboardingBasicInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUserOnboardingBasicInfoMutation,
    UpdateUserOnboardingBasicInfoMutationVariables
  >(UpdateUserOnboardingBasicInfoDocument, options);
}
export type UpdateUserOnboardingBasicInfoMutationHookResult = ReturnType<
  typeof useUpdateUserOnboardingBasicInfoMutation
>;
export type UpdateUserOnboardingBasicInfoMutationResult =
  ApolloReactCommon.MutationResult<UpdateUserOnboardingBasicInfoMutation>;
export type UpdateUserOnboardingBasicInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserOnboardingBasicInfoMutation,
  UpdateUserOnboardingBasicInfoMutationVariables
>;
export const GetSkillsAutocompleteDocument = gql`
  mutation getSkillsAutocomplete($prefix: String!) {
    getSkillsAutocomplete(prefix: $prefix) {
      skills {
        id
        name
        logoUrl
      }
    }
  }
`;
export type GetSkillsAutocompleteMutationFn = ApolloReactCommon.MutationFunction<
  GetSkillsAutocompleteMutation,
  GetSkillsAutocompleteMutationVariables
>;

/**
 * __useGetSkillsAutocompleteMutation__
 *
 * To run a mutation, you first call `useGetSkillsAutocompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetSkillsAutocompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getSkillsAutocompleteMutation, { data, loading, error }] = useGetSkillsAutocompleteMutation({
 *   variables: {
 *      prefix: // value for 'prefix'
 *   },
 * });
 */
export function useGetSkillsAutocompleteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetSkillsAutocompleteMutation,
    GetSkillsAutocompleteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    GetSkillsAutocompleteMutation,
    GetSkillsAutocompleteMutationVariables
  >(GetSkillsAutocompleteDocument, options);
}
export type GetSkillsAutocompleteMutationHookResult = ReturnType<
  typeof useGetSkillsAutocompleteMutation
>;
export type GetSkillsAutocompleteMutationResult =
  ApolloReactCommon.MutationResult<GetSkillsAutocompleteMutation>;
export type GetSkillsAutocompleteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GetSkillsAutocompleteMutation,
  GetSkillsAutocompleteMutationVariables
>;
export const IsUsernameAvailableDocument = gql`
  mutation isUsernameAvailable($username: String!) {
    isUsernameAvailable(input: $username)
  }
`;
export type IsUsernameAvailableMutationFn = ApolloReactCommon.MutationFunction<
  IsUsernameAvailableMutation,
  IsUsernameAvailableMutationVariables
>;

/**
 * __useIsUsernameAvailableMutation__
 *
 * To run a mutation, you first call `useIsUsernameAvailableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIsUsernameAvailableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [isUsernameAvailableMutation, { data, loading, error }] = useIsUsernameAvailableMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIsUsernameAvailableMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    IsUsernameAvailableMutation,
    IsUsernameAvailableMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    IsUsernameAvailableMutation,
    IsUsernameAvailableMutationVariables
  >(IsUsernameAvailableDocument, options);
}
export type IsUsernameAvailableMutationHookResult = ReturnType<
  typeof useIsUsernameAvailableMutation
>;
export type IsUsernameAvailableMutationResult =
  ApolloReactCommon.MutationResult<IsUsernameAvailableMutation>;
export type IsUsernameAvailableMutationOptions = ApolloReactCommon.BaseMutationOptions<
  IsUsernameAvailableMutation,
  IsUsernameAvailableMutationVariables
>;
export const UpdateUserOnboardingClanInfoDocument = gql`
  mutation updateUserOnboardingClanInfo(
    $updateUserOnboardingClanInfoInput: UpdateUserOnboardingClanInfoInput!
  ) {
    updateUserOnboardingClanInfo(input: $updateUserOnboardingClanInfoInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;
export type UpdateUserOnboardingClanInfoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserOnboardingClanInfoMutation,
  UpdateUserOnboardingClanInfoMutationVariables
>;

/**
 * __useUpdateUserOnboardingClanInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserOnboardingClanInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnboardingClanInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOnboardingClanInfoMutation, { data, loading, error }] = useUpdateUserOnboardingClanInfoMutation({
 *   variables: {
 *      updateUserOnboardingClanInfoInput: // value for 'updateUserOnboardingClanInfoInput'
 *   },
 * });
 */
export function useUpdateUserOnboardingClanInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserOnboardingClanInfoMutation,
    UpdateUserOnboardingClanInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUserOnboardingClanInfoMutation,
    UpdateUserOnboardingClanInfoMutationVariables
  >(UpdateUserOnboardingClanInfoDocument, options);
}
export type UpdateUserOnboardingClanInfoMutationHookResult = ReturnType<
  typeof useUpdateUserOnboardingClanInfoMutation
>;
export type UpdateUserOnboardingClanInfoMutationResult =
  ApolloReactCommon.MutationResult<UpdateUserOnboardingClanInfoMutation>;
export type UpdateUserOnboardingClanInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserOnboardingClanInfoMutation,
  UpdateUserOnboardingClanInfoMutationVariables
>;
export const GetCompaniesAutocompleteDocument = gql`
  mutation getCompaniesAutocomplete($prefix: String!) {
    getCompaniesAutocomplete(prefix: $prefix) {
      companies {
        name
        logoUrl
      }
    }
  }
`;
export type GetCompaniesAutocompleteMutationFn = ApolloReactCommon.MutationFunction<
  GetCompaniesAutocompleteMutation,
  GetCompaniesAutocompleteMutationVariables
>;

/**
 * __useGetCompaniesAutocompleteMutation__
 *
 * To run a mutation, you first call `useGetCompaniesAutocompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesAutocompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getCompaniesAutocompleteMutation, { data, loading, error }] = useGetCompaniesAutocompleteMutation({
 *   variables: {
 *      prefix: // value for 'prefix'
 *   },
 * });
 */
export function useGetCompaniesAutocompleteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetCompaniesAutocompleteMutation,
    GetCompaniesAutocompleteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    GetCompaniesAutocompleteMutation,
    GetCompaniesAutocompleteMutationVariables
  >(GetCompaniesAutocompleteDocument, options);
}
export type GetCompaniesAutocompleteMutationHookResult = ReturnType<
  typeof useGetCompaniesAutocompleteMutation
>;
export type GetCompaniesAutocompleteMutationResult =
  ApolloReactCommon.MutationResult<GetCompaniesAutocompleteMutation>;
export type GetCompaniesAutocompleteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GetCompaniesAutocompleteMutation,
  GetCompaniesAutocompleteMutationVariables
>;
export const GetCollegesAutocompleteDocument = gql`
  mutation getCollegesAutocomplete($prefix: String!) {
    getCollegesAutocomplete(prefix: $prefix) {
      colleges {
        id
        name
      }
    }
  }
`;
export type GetCollegesAutocompleteMutationFn = ApolloReactCommon.MutationFunction<
  GetCollegesAutocompleteMutation,
  GetCollegesAutocompleteMutationVariables
>;

/**
 * __useGetCollegesAutocompleteMutation__
 *
 * To run a mutation, you first call `useGetCollegesAutocompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetCollegesAutocompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getCollegesAutocompleteMutation, { data, loading, error }] = useGetCollegesAutocompleteMutation({
 *   variables: {
 *      prefix: // value for 'prefix'
 *   },
 * });
 */
export function useGetCollegesAutocompleteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetCollegesAutocompleteMutation,
    GetCollegesAutocompleteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    GetCollegesAutocompleteMutation,
    GetCollegesAutocompleteMutationVariables
  >(GetCollegesAutocompleteDocument, options);
}
export type GetCollegesAutocompleteMutationHookResult = ReturnType<
  typeof useGetCollegesAutocompleteMutation
>;
export type GetCollegesAutocompleteMutationResult =
  ApolloReactCommon.MutationResult<GetCollegesAutocompleteMutation>;
export type GetCollegesAutocompleteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GetCollegesAutocompleteMutation,
  GetCollegesAutocompleteMutationVariables
>;
export const UpdateUserOnboardingJobPreferenceDocument = gql`
  mutation updateUserOnboardingJobPreference(
    $updateUserOnboardingJobPreferenceInput: UpdateUserOnboardingJobPreferenceInput!
  ) {
    updateUserOnboardingJobPreference(input: $updateUserOnboardingJobPreferenceInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;
export type UpdateUserOnboardingJobPreferenceMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserOnboardingJobPreferenceMutation,
  UpdateUserOnboardingJobPreferenceMutationVariables
>;

/**
 * __useUpdateUserOnboardingJobPreferenceMutation__
 *
 * To run a mutation, you first call `useUpdateUserOnboardingJobPreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnboardingJobPreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOnboardingJobPreferenceMutation, { data, loading, error }] = useUpdateUserOnboardingJobPreferenceMutation({
 *   variables: {
 *      updateUserOnboardingJobPreferenceInput: // value for 'updateUserOnboardingJobPreferenceInput'
 *   },
 * });
 */
export function useUpdateUserOnboardingJobPreferenceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserOnboardingJobPreferenceMutation,
    UpdateUserOnboardingJobPreferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUserOnboardingJobPreferenceMutation,
    UpdateUserOnboardingJobPreferenceMutationVariables
  >(UpdateUserOnboardingJobPreferenceDocument, options);
}
export type UpdateUserOnboardingJobPreferenceMutationHookResult = ReturnType<
  typeof useUpdateUserOnboardingJobPreferenceMutation
>;
export type UpdateUserOnboardingJobPreferenceMutationResult =
  ApolloReactCommon.MutationResult<UpdateUserOnboardingJobPreferenceMutation>;
export type UpdateUserOnboardingJobPreferenceMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    UpdateUserOnboardingJobPreferenceMutation,
    UpdateUserOnboardingJobPreferenceMutationVariables
  >;
export const UpdateUserOnboardingProfileInfoDocument = gql`
  mutation updateUserOnboardingProfileInfo(
    $updateUserOnboardingProfileInfoInput: UpdateUserOnboardingProfileInfoInput!
  ) {
    updateUserOnboardingProfileInfo(input: $updateUserOnboardingProfileInfoInput) {
      onboardingUser {
        email
        lastCompletedState
      }
    }
  }
`;
export type UpdateUserOnboardingProfileInfoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserOnboardingProfileInfoMutation,
  UpdateUserOnboardingProfileInfoMutationVariables
>;

/**
 * __useUpdateUserOnboardingProfileInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserOnboardingProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOnboardingProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOnboardingProfileInfoMutation, { data, loading, error }] = useUpdateUserOnboardingProfileInfoMutation({
 *   variables: {
 *      updateUserOnboardingProfileInfoInput: // value for 'updateUserOnboardingProfileInfoInput'
 *   },
 * });
 */
export function useUpdateUserOnboardingProfileInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserOnboardingProfileInfoMutation,
    UpdateUserOnboardingProfileInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUserOnboardingProfileInfoMutation,
    UpdateUserOnboardingProfileInfoMutationVariables
  >(UpdateUserOnboardingProfileInfoDocument, options);
}
export type UpdateUserOnboardingProfileInfoMutationHookResult = ReturnType<
  typeof useUpdateUserOnboardingProfileInfoMutation
>;
export type UpdateUserOnboardingProfileInfoMutationResult =
  ApolloReactCommon.MutationResult<UpdateUserOnboardingProfileInfoMutation>;
export type UpdateUserOnboardingProfileInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserOnboardingProfileInfoMutation,
  UpdateUserOnboardingProfileInfoMutationVariables
>;
export const PersonalReferralLinkJobsDocument = gql`
  query personalReferralLinkJobs(
    $first: Int
    $after: ID
    $referrerUsername: String!
    $applicantUsername: String!
    $filters: PersonalReferralJobFilter
  ) {
    personalReferralJobs(
      first: $first
      after: $after
      referrerUsername: $referrerUsername
      filters: $filters
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          role
          company {
            id
            name
            logoUrl
          }
          location
          url
          recency
          postedDate
          seniority
          hasAlreadyPersonallyRequested(applicantUsername: $applicantUsername)
          isEligible(applicantUsername: $applicantUsername)
          hasEnoughGems(applicantUsername: $applicantUsername)
        }
      }
    }
  }
`;

/**
 * __usePersonalReferralLinkJobsQuery__
 *
 * To run a query within a React component, call `usePersonalReferralLinkJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalReferralLinkJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalReferralLinkJobsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      referrerUsername: // value for 'referrerUsername'
 *      applicantUsername: // value for 'applicantUsername'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function usePersonalReferralLinkJobsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    PersonalReferralLinkJobsQuery,
    PersonalReferralLinkJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    PersonalReferralLinkJobsQuery,
    PersonalReferralLinkJobsQueryVariables
  >(PersonalReferralLinkJobsDocument, options);
}
export function usePersonalReferralLinkJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PersonalReferralLinkJobsQuery,
    PersonalReferralLinkJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    PersonalReferralLinkJobsQuery,
    PersonalReferralLinkJobsQueryVariables
  >(PersonalReferralLinkJobsDocument, options);
}
export type PersonalReferralLinkJobsQueryHookResult = ReturnType<
  typeof usePersonalReferralLinkJobsQuery
>;
export type PersonalReferralLinkJobsLazyQueryHookResult = ReturnType<
  typeof usePersonalReferralLinkJobsLazyQuery
>;
export type PersonalReferralLinkJobsQueryResult = ApolloReactCommon.QueryResult<
  PersonalReferralLinkJobsQuery,
  PersonalReferralLinkJobsQueryVariables
>;
export const FetchReferralRequestsDocument = gql`
  query fetchReferralRequests(
    $first: Int
    $after: ID
    $username: ID!
    $filters: ReferralRequestFilter
  ) {
    user(username: $username) {
      username
      referralRequests(first: $first, after: $after, filters: $filters) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            jobInfo {
              jobUrl
              jobRole
              jobLocation
              company {
                name
                logoUrl
              }
            }
            applicantInfo {
              name
              networkType
              profilePicUrl
              resumeUrl
              latestCollegeName
              currentDesignation
              companyName
              yearsOfExperience {
                months
                years
              }
            }
            referralState
            appliedOn
          }
        }
      }
    }
  }
`;

/**
 * __useFetchReferralRequestsQuery__
 *
 * To run a query within a React component, call `useFetchReferralRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchReferralRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchReferralRequestsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      username: // value for 'username'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchReferralRequestsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    FetchReferralRequestsQuery,
    FetchReferralRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<FetchReferralRequestsQuery, FetchReferralRequestsQueryVariables>(
    FetchReferralRequestsDocument,
    options
  );
}
export function useFetchReferralRequestsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FetchReferralRequestsQuery,
    FetchReferralRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    FetchReferralRequestsQuery,
    FetchReferralRequestsQueryVariables
  >(FetchReferralRequestsDocument, options);
}
export type FetchReferralRequestsQueryHookResult = ReturnType<typeof useFetchReferralRequestsQuery>;
export type FetchReferralRequestsLazyQueryHookResult = ReturnType<
  typeof useFetchReferralRequestsLazyQuery
>;
export type FetchReferralRequestsQueryResult = ApolloReactCommon.QueryResult<
  FetchReferralRequestsQuery,
  FetchReferralRequestsQueryVariables
>;
export const UpdateReferralSettingsDocument = gql`
  mutation updateReferralSettings($updateReferralSettingsInput: UpdateReferralSettingsInput!) {
    updateReferralSettings(input: $updateReferralSettingsInput) {
      username
    }
  }
`;
export type UpdateReferralSettingsMutationFn = ApolloReactCommon.MutationFunction<
  UpdateReferralSettingsMutation,
  UpdateReferralSettingsMutationVariables
>;

/**
 * __useUpdateReferralSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateReferralSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReferralSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReferralSettingsMutation, { data, loading, error }] = useUpdateReferralSettingsMutation({
 *   variables: {
 *      updateReferralSettingsInput: // value for 'updateReferralSettingsInput'
 *   },
 * });
 */
export function useUpdateReferralSettingsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateReferralSettingsMutation,
    UpdateReferralSettingsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateReferralSettingsMutation,
    UpdateReferralSettingsMutationVariables
  >(UpdateReferralSettingsDocument, options);
}
export type UpdateReferralSettingsMutationHookResult = ReturnType<
  typeof useUpdateReferralSettingsMutation
>;
export type UpdateReferralSettingsMutationResult =
  ApolloReactCommon.MutationResult<UpdateReferralSettingsMutation>;
export type UpdateReferralSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateReferralSettingsMutation,
  UpdateReferralSettingsMutationVariables
>;
export const UserDocument = gql`
  query user($username: ID!) {
    user(username: $username) {
      username
      clans {
        name
        id
      }
      workExperience {
        currentCompany {
          id
          name
        }
      }
      referralSettings {
        isPublic
        eligibleClans {
          id
          name
          logoUrl
        }
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const PersonalReferralSettingsJobsDocument = gql`
  query personalReferralSettingsJobs(
    $first: Int
    $after: ID
    $referrerUsername: String!
    $filters: PersonalReferralJobFilter
  ) {
    personalReferralJobs(
      first: $first
      after: $after
      referrerUsername: $referrerUsername
      filters: $filters
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          role
          company {
            id
            name
            logoUrl
          }
          location
          url
          recency
          postedDate
          seniority
        }
      }
    }
  }
`;

/**
 * __usePersonalReferralSettingsJobsQuery__
 *
 * To run a query within a React component, call `usePersonalReferralSettingsJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalReferralSettingsJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalReferralSettingsJobsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      referrerUsername: // value for 'referrerUsername'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function usePersonalReferralSettingsJobsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    PersonalReferralSettingsJobsQuery,
    PersonalReferralSettingsJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    PersonalReferralSettingsJobsQuery,
    PersonalReferralSettingsJobsQueryVariables
  >(PersonalReferralSettingsJobsDocument, options);
}
export function usePersonalReferralSettingsJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PersonalReferralSettingsJobsQuery,
    PersonalReferralSettingsJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    PersonalReferralSettingsJobsQuery,
    PersonalReferralSettingsJobsQueryVariables
  >(PersonalReferralSettingsJobsDocument, options);
}
export type PersonalReferralSettingsJobsQueryHookResult = ReturnType<
  typeof usePersonalReferralSettingsJobsQuery
>;
export type PersonalReferralSettingsJobsLazyQueryHookResult = ReturnType<
  typeof usePersonalReferralSettingsJobsLazyQuery
>;
export type PersonalReferralSettingsJobsQueryResult = ApolloReactCommon.QueryResult<
  PersonalReferralSettingsJobsQuery,
  PersonalReferralSettingsJobsQueryVariables
>;
export const TodoDocument = gql`
  query Todo($todoId: ID!) {
    Todo(todoId: $todoId) {
      description
      completed
    }
  }
`;

/**
 * __useTodoQuery__
 *
 * To run a query within a React component, call `useTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoQuery({
 *   variables: {
 *      todoId: // value for 'todoId'
 *   },
 * });
 */
export function useTodoQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<TodoQuery, TodoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
}
export function useTodoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TodoQuery, TodoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
}
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>;
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>;
export type TodoQueryResult = ApolloReactCommon.QueryResult<TodoQuery, TodoQueryVariables>;
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($todoId: ID!, $data: UpdateTodoInput!) {
    updateTodo(todoId: $todoId, data: $data) {
      description
      completed
    }
  }
`;
export type UpdateTodoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      todoId: // value for 'todoId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    options
  );
}
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = ApolloReactCommon.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;
