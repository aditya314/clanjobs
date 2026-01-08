import { useMediaQuery } from '@chakra-ui/react';
import ReferralRequestCardBig from '@components/referralRequests/referralRequestCard/referralRequestCardBig';
import ReferralRequestCardMobile from '@components/referralRequests/referralRequestCard/referralRequestCardMobile';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export default function ReferralRequestCard({
  username,
  referralRequestId,
  applicantName = 'Dan Abramov',
  applicantImageSrc,
  yearsOfExperience,
  role = 'Software Development Engineer',
  location,
  companyName = 'Codechef',
  collegeName = 'National Institute of Technology, Jamshedpur',
  appliedRole = 'Software Development Engineer- 2',
  jobRoleHref = 'https://chakra-ui.com/docs/typography/text',
  appliedDate = '12th May, 2020',
  networkType = 'CLAN',
  referralRequestState,
}) {
  const [isMobile] = useMediaQuery('(max-width: 30em)');
  // const [isLargerThanMobile] = useMediaQuery('(min-width: 48em)');

  return isMobile ? (
    <ReferralRequestCardMobile
      username={username}
      referralRequestId={referralRequestId}
      name={applicantName}
      src={applicantImageSrc}
      role={role}
      companyName={companyName}
      collegeName={collegeName}
      href={jobRoleHref}
      label={appliedRole}
      yearsOfExperience={yearsOfExperience}
      appliedDate={appliedDate}
      networkType={networkType}
      referralRequestState={referralRequestState}
    />
  ) : (
    <ReferralRequestCardBig
      username={username}
      referralRequestId={referralRequestId}
      name={applicantName}
      src={applicantImageSrc}
      role={role}
      companyName={companyName}
      collegeName={collegeName}
      href={jobRoleHref}
      label={appliedRole}
      yearsOfExperience={yearsOfExperience}
      appliedDate={appliedDate}
      networkType={networkType}
      referralRequestState={referralRequestState}
    />
  );
}
