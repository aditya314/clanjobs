export enum ONBOARDING_STATE {
  BASIC_INFO = 'BASIC_INFO',
  CLAN_INFO = 'CLAN_INFO',
  PROFILE_INFO = 'PROFILE_INFO',
  JOB_PREFERENCE = 'JOB_PREFERENCE',
}

export default interface IUserOnboardingAuth {
  email: string;
  username: string;
  isFresher: boolean;
  lastCompletedState: ONBOARDING_STATE;
}
