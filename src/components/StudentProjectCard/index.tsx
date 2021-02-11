import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Tag,
  Text,
  Flex,
  Box,
  Heading,
  Button,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import ProjectMap from '../../../content/maps/projects.yml';
import { RiBracesFill as CurlyBracesIcon } from 'react-icons/ri';

type TStudentProjectCardProps = {
  title: string;
  project: string;
  repo: string;
  year: number;
  slug: string;
  students: Array<{ name: string; picture: string }>;
};

const StudentProjectCard = (props: TStudentProjectCardProps) => {
  return (
    <LinkBox
      display="flex"
      as="div"
      flexDirection="column"
      bg="whiteAlpha.200"
      padding={4}
      borderRadius={6}
      className="sudentProjectCard"
      sx={{
        '&>a:hover': {
          textDecoration: 'none',
        },
      }}
    >
      <Text fontSize="sm" fontWeight="normal" as="div">
        {props.year}
      </Text>
      <Heading as="h1" size="md" margin={0}>
        {props.title}
      </Heading>
      <Box marginY={2}>
        <Tag variant="subtle">{ProjectMap[props.project].es}</Tag>
      </Box>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gridGap={2}
        justifyContent="space-between"
        mt={2}
        alignContent="stretch"
      >
        <AvatarGroup size="sm">
          {props.students.map((student, index) => {
            return (
              <Avatar
                key={index}
                name={student.name}
                src={student.picture}
                borderColor="teal.200"
              />
            );
          })}
        </AvatarGroup>
        <LinkOverlay
          as={GatsbyLink}
          to={props.slug}
          textAlign="right"
          sx={{ '&:hover': { textDecoration: 'none' } }}
        >
          <Button
            variant="ghost"
            leftIcon={<CurlyBracesIcon size={18} />}
            size="sm"
          >
            Ver proyecto
          </Button>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  );
};

export default StudentProjectCard;
