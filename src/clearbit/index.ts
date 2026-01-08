import axios from 'axios';
import { map, uniqBy, values } from 'lodash';
import { CompanyAutocomplete } from '@src/graphql/types';

export default async function getUniqueResponseFromClearbitAPI(
  text: string
): Promise<Array<CompanyAutocomplete>> {
  let response = await axios.get(
    'https://autocomplete.clearbit.com/v1/companies/suggest?query=' + text
  );
  let responseUniqByNameAndDomain: Array<{ name: string; logo: string }> = uniqBy(
    uniqBy(values(response.data), 'name'),
    'domain'
  );
  return map(responseUniqByNameAndDomain, company => ({
    name: company.name,
    logoUrl: company.logo,
  })) as Array<CompanyAutocomplete>;
}
