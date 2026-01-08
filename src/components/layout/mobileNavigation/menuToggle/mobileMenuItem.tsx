import React from 'react';
import { motion } from 'framer-motion';
import { Button, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MotionButton = motion(Button);

function MobileMenuItem({ href, title }) {
  var isActive = false;
  const { pathname } = useRouter();

  if (href !== '/') {
    const [, group] = href.split('/');

    isActive = pathname.includes(group);
  } else {
    if (href === pathname) {
      isActive = true;
    }
  }

  return (
    <Link href={href} passHref>
      <MotionButton
        size="lg"
        aria-current={isActive ? 'page' : undefined}
        w="100%"
        variant="variantSolid"
      >
        {title}
      </MotionButton>
    </Link>
  );
}

export default MobileMenuItem;
