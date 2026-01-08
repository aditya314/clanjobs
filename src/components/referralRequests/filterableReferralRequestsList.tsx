import React, { useState } from 'react';
import ReferralRequestFiltersSection from '@components/referralRequests/referalRequestsFiltersSection';
import ScrollableReferralRequestsList from '@components/referralRequests/scrollableReferralRequestsList';

export default function FilterableReferralRequestsList() {
  const [filters, setFilters] = useState(undefined);
  return (
    <React.Fragment>
      <ReferralRequestFiltersSection />
      <ScrollableReferralRequestsList filters={filters} />
    </React.Fragment>
  );
}
