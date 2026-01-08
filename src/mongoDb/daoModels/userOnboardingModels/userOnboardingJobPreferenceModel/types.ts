import { ROLE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

export default interface IUserOnboardingJobPreference {
  email: string;
  preferredRole: string;
  preferredLocations: Array<string>;
  preferredCTC: number;
  noticePeriod: number;
  signupReason?: string;
  invitedBy?: string;
}
