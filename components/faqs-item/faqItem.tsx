import { Text, Box } from "@chakra-ui/react";

interface FaqItemProps {
  question: string;
  answer: JSX.Element | string;
}

export const FaqItem: React.FC<FaqItemProps> = (props) => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        {props.question}
      </Text>
      <Text fontSize="md">{props.answer}</Text>
    </Box>
  );
};
