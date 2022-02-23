import { Text, Box } from "@chakra-ui/react";

export default function faqItem(props) {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        {props.question}
      </Text>
      <Text fontSize="md">{props.answer}</Text>
    </Box>
  );
}
