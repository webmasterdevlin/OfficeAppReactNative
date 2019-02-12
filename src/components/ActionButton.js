import React from "react";
import { Text, Button } from "native-base";

const ActionButton = ({ Title, onPress, success, info, disabled }) => {
  return (
    <Button
      disabled={disabled}
      full
      info={info}
      success={success}
      style={{ margin: 20 }}
      onPress={onPress}
    >
      <Text>{Title}</Text>
    </Button>
  );
};

export default ActionButton;
