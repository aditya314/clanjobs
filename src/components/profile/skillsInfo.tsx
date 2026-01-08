import { Flex, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { keys, map } from 'lodash';
import { Skill, Skills } from '@src/graphql/types';

function SkillInfo({ skillName, skillLogo }) {
  return (
    <Flex align="center" m={2}>
      <Image src={skillLogo} alt={skillName} width="30px" height="30px" objectFit={'contain'} />
      <Flex direction="column" p={4}>
        <Text fontWeight={'semibold'}>{skillName}</Text>
      </Flex>
    </Flex>
  );
}

function CoreSkillsInfo({ coreSkills }) {
  return (
    <Flex direction="column" p={2}>
      <Text color="gray.500">Core Skills</Text>
      <Flex direction="row" flexWrap={'wrap'} align="center">
        {map(coreSkills, (skill: Skill) => (
          <SkillInfo key={skill.id} skillName={skill.name} skillLogo={skill.logoUrl} />
        ))}
      </Flex>
    </Flex>
  );
}

function FamiliarSkillsInfo({ familiarSkills }) {
  return (
    <Flex direction="column" p={2}>
      <Text color="gray.500">Familiar Skills</Text>
      <Flex direction="row" flexWrap={'wrap'} align="center">
        {map(familiarSkills, (skill: Skill) => (
          <SkillInfo key={skill.id} skillName={skill.name} skillLogo={skill.logoUrl} />
        ))}
      </Flex>
    </Flex>
  );
}

export default function SkillsInfo({ skills }: { skills: Skills }) {
  return (
    <>
      <CoreSkillsInfo coreSkills={skills.coreSkills} />
      <FamiliarSkillsInfo familiarSkills={skills.familiarSkills} />
    </>
  );
}
