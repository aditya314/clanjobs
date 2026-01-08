import { Flex } from '@chakra-ui/react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import React from 'react';

export default function SocialShare({ company, referralLink }) {
  const shareMessageTitle =
    'Hello connections! ' +
    company +
    ' is hiring!!!. Use my personal referral link to check for open roles and apply here to get my referral';
  const iconSize = 40;
  return (
    <Flex width={['100%', '20%']} alignItems="center" justifyContent="space-between" mt={2}>
      <LinkedinShareButton url={referralLink} title={shareMessageTitle}>
        <LinkedinIcon size={iconSize} round />
      </LinkedinShareButton>
      <FacebookShareButton url={referralLink} quote={shareMessageTitle} hashtag={'#referral'}>
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>
      <WhatsappShareButton url={referralLink} title={shareMessageTitle} separator="🐺">
        <WhatsappIcon size={iconSize} round />
      </WhatsappShareButton>
      <TelegramShareButton url={referralLink} title={shareMessageTitle}>
        <TelegramIcon size={iconSize} round />
      </TelegramShareButton>
    </Flex>
  );
}
