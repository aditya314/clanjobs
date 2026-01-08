import mongoose, { Model, Schema } from 'mongoose';
import IReferralRequest from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { S3Path } from '../../userOnboardingModels/userOnboardingBasicInfoModel';
import { Company } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel';

const ReferrerStateInfo = {
  username: {
    type: String,
    required: true,
  },
  networkType: {
    type: String,
    required: true,
  },
  referralRequestStatus: {
    type: String, // of referrer
    required: true,
  },
};

const ReferralRequest: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  applicantInfo: {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePic: {
      type: S3Path,
      required: false,
    },
    currentDesignation: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    latestCollegeName: {
      type: String,
      required: true,
    },
    resume: S3Path,
    yearsOfExperience: {
      years: {
        type: Number,
        required: true,
      },
      months: {
        type: Number,
        required: true,
      },
    },
    clans: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          sourceId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  jobInfo: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    linkedinJobId: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    jobUrl: {
      type: String,
      required: true,
    },
    company: {
      type: Company,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
  },
  askedReferralStatus: {
    type: String, // for applicant
    required: true,
  },
  referrersList: {
    type: [ReferrerStateInfo],
    required: true,
  },
  appliedOn: {
    type: Number,
    required: true,
  },
});

export const ReferralRequestModel: Model<IReferralRequest> =
  mongoose.models.ReferralRequest ||
  mongoose.model<IReferralRequest>('ReferralRequest', ReferralRequest);
