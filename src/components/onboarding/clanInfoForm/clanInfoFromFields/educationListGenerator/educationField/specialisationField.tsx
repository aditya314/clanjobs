import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { forEach, keys, map } from 'lodash';
import MultiSelect from '@src/components/common/ChakraSelect';

export enum SPECIALIZATION {
  AEROSPACE_ENGINEERING = 'Aerospace Engineering',
  AGRICULTURE_ENGINEERING = 'Agriculture Engineering',
  ANTHROPOLOGY = 'Anthropology',
  ARCHITECTURE = 'Architecture',
  ASTRONAUTICAL_ENGINEERING = 'Astronautical Engineering',
  AUTOMOBILE_ENGINEERING = 'Automobile Engineering',
  AVIATION = 'Aviation',
  BIOCHEMISTRY = 'Biochemistry',
  BIOLOGY = 'Biology',
  BIOMEDICAL_ENGINEERING = 'Biomedical Engineering',
  BIOTECHNOLOGY = 'Biotechnology',
  BOTANY = 'Botany',
  CERAMICS = 'Ceramics',
  CHEMICAL_ENGINEERING = 'Chemical Engineering',
  CHEMISTRY = 'Chemistry',
  CIVIL_ENGINEERING = 'Civil Engineering',
  COMMERCE = 'Commerce',
  COMPUTER_SCIENCE = 'Computer Science',
  ELECTRICAL_ENGINEERING = 'Electrical Engineering',
  ELECTRONICS = 'Electronics',
  ENVIRONMENTAL_SCIENCE = 'Environmental Science',
  GRAPHIC_DESIGN = 'Graphic Design',
  INDUSTRIAL_ENGINEERING = 'Industrial Engineering',
  INFORMATION_TECHNOLOGY = 'Information Technology',
  MARINE_ENGINEERING = 'Marine Engineering',
  MATHS = 'Maths',
  MECHANICAL_ENGINEERING = 'Mechanical Engineering',
  MEDICINE = 'Medicine',
  METALLURGY = 'Metallurgy',
  MICROBIOLOGY = 'Microbiology',
  MINING_MINERAL = 'Mining & Mineral',
  NUCLEAR_ENGINEERING = 'Nuclear Engineering',
  NURSING = 'Nursing',
  PETROLEUM_ENGINEERING = 'Petroleum Engineering',
  PHYSICS = 'Physics',
  PLASTICS_ENGINEERING = 'Plastics Engineering',
  PRODUCT_DESIGN = 'Product Design',
  PSYCHOLOGY = 'Psychology',
  STATISTICS = 'Statistics',
  TEXTILE_ENGINEERING = 'Textile Engineering',
  VETERINARY_SCIENCE = 'Veterinary Science',
  ZOOLOGY = 'Zoology',
  INSTRUMENTATION_CONTROL = 'Instrumentation & Control',
  ANIMATION_MULTIMEDIA = 'Animation & Multimedia',
}

export const SpecialisationList = map(keys(SPECIALIZATION), specializationType => {
  return {
    value: specializationType,
    label: SPECIALIZATION[specializationType],
  };
});

function validateSpecialisation(value) {
  value = value?.value;
  let error;
  if (!map(SpecialisationList, 'value').includes(value))
    error = 'Please fill specialisation field with correct value';
  return error;
}

function hasSpecialisedFieldErrored(form, identifier) {
  return (
    form.errors.educationList &&
    form.errors.educationList.length > Number(identifier) &&
    form.errors.educationList[Number(identifier)]?.educationInfo.specialisation
  );
}

function isSpecialisationFieldTouched(form, identifier) {
  return (
    form.touched.educationList &&
    form.touched.educationList.length > Number(identifier) &&
    form.touched.educationList[Number(identifier)]?.educationInfo.specialisation
  );
}

export default function SpecialisationField({ identifier }) {
  return (
    <Field
      name={`educationList[${identifier}].educationInfo.specialisation`}
      validate={validateSpecialisation}
    >
      {({ field, form }) => (
        <FormControl
          isInvalid={
            hasSpecialisedFieldErrored(form, identifier) &&
            isSpecialisationFieldTouched(form, identifier)
          }
          isRequired
          my={4}
          mr={12}
        >
          <FormLabel>Specialisation</FormLabel>
          {/*<>{console.log('Form inside DegreeField', form, field)}</>*/}
          <MultiSelect
            isMulti={false}
            {...field}
            id={`educationList[${identifier}].educationInfo.specialisation`}
            placeholder="Select your branch/specialisation"
            options={SpecialisationList}
            onChange={option => {
              form.setFieldValue(field.name, option);
              form.setFieldTouched(field.name, true, true);
            }}
          />
          <FormErrorMessage>{hasSpecialisedFieldErrored(form, identifier)}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
