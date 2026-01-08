import { gql } from 'apollo-server-micro';

export default gql`
  enum UserType {
    APPLICANT
    REFERRER
  }

  enum ClanType {
    COLLEGE
    COMPANY
  }
  enum NetworkType {
    CLAN
    PERSONAL
    PUBLIC
  }

  enum Gender {
    MALE
    FEMALE
  }
  enum OnboardingState {
    BASIC_INFO
    CLAN_INFO
    PROFILE_INFO
    JOB_PREFERENCE
  }
  enum Recency {
    DAY
    WEEK
    MONTH
    ANY
  }
  enum Seniority {
    INTERNSHIP
    ENTRY_LEVEL
    ASSOCIATE
    MID_SENIOR
    DIRECTOR
    EXECUTIVE
  }

  enum ReferralState {
    APPLIED
    IN_REVIEW
    ACCEPTED
    DECLINED
    ACKNOWLEDGED
    EXPIRED
  }
`;
