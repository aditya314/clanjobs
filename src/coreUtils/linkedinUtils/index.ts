import { TokenSet } from 'next-auth';

export const getLinkedInEmail = async (accessToken: TokenSet['accessToken']) => {
  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${accessToken}`
    );
    const data = await response.json();
    return data.elements?.[0]?.['handle~']?.emailAddress;
  } catch (e) {
    return null;
  }
};

export const getLinkedInPhoto = async (accessToken: TokenSet['accessToken']) => {
  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))&oauth2_access_token=${accessToken}`
    );
    const data = await response.json();
    return data.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier;
  } catch (e) {
    return null;
  }
};
