import React from 'react';
import { Link as ChakraLink, LinkProps, CSSObject } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';

type TLinkProps = LinkProps & { activeStyle?: CSSObject };

const Link = ({ href, children, activeStyle, ...linkProps }: TLinkProps) => {
  const isExternal: boolean =
    linkProps.isExternal || (href ? href.startsWith('http') : false);

  return (
    // TODO: Don't opt out from type checking once `ChakraLink` gets fixed
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    <ChakraLink
      {...(isExternal
        ? {
            href,
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
          }
        : { as: GatsbyLink, to: href, activeStyle })}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
