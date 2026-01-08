import { Box } from '@chakra-ui/react';
import NextImage from 'next/image';

export const Image = props => {
  const { src, alt, ...rest } = props;
  return (
    <Box position="relative" {...rest}>
      <NextImage objectFit="contain" layout="fill" src={src} alt={alt} />
    </Box>
  );
};

export default Image;

// import NextImage from 'next/image';
// import { chakra, ImageProps } from '@chakra-ui/react';
//
// const Img = chakra(NextImage, {
//   shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop),
// });
//
// export const Image = (props: ImageProps) => {
//   // @ts-ignore
//   return <Img {...props} />;
// };
// export default Image;
