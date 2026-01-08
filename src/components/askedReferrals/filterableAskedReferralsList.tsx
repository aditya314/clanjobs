import AskedReferralsFilters from '@components/askedReferrals/askedReferralFiltersSection';
import ScrollableAskedReferralsList from '@components/askedReferrals/scrollableAskedReferralsList';
import React, { useState } from 'react';

export default function FilterableAskedReferralsList() {
  const [filters, setFilters] = useState(undefined);
  return (
    <React.Fragment>
      <AskedReferralsFilters />
      <ScrollableAskedReferralsList filters={filters} />
    </React.Fragment>
  );
}
