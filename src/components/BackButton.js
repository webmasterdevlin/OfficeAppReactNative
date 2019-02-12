import React from "react";
import { Text, Button } from "native-base";

const BackButton = ({ onPress }) => {
  return (
    <Button bordered full warn warning style={{ margin: 20 }} onPress={onPress}>
      <Text>Back</Text>
    </Button>
  );
};

export default BackButton;
