export enum UPLOAD_STATE {
  UPLOAD_IN_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
  UPLOAD_NOT_INITIATED,
}

export enum ASSETS_BUCKET {
  PROFILE_PICTURES = 'clanjobs-assets-0',
  RESUME_FILES = 'clanjobs-assets-0',
  LOGOS = 'clanjobs-assets-0',
}

export enum S3_FOLDER {
  COMPANY_LOGOS = 'company_logos',
  SKILL_LOGOS = 'skill_logos',
  RESUME_FILES = 'resume_files',
  PROFILE_PICTURES = 'profile_pictures',
}

export enum ErrorCodes {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  INSUFFICIENT_GEMS = 'INSUFFICIENT_GEMS',
  INVALID_INPUT = 'INVALID_INPUT',
}

export enum GemValues {
  INITIAL_GEMS = 200,
  SIGNUP_REFERRAL = 50,
  ASK_REFERRAL = 20,
  REFERRAL_STATE_CHANGE = 5,
  APPLICANT_ACKNOWLEDGE = 25,
  REFERRER_ACKNOWLEDGE = 100,
}

export enum GamificationEvent {
  ASK_REFERRAL = 'ASK_REFERRAL',
}
