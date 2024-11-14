import React from "react";
import { View } from "react-native";
import StepIndicator from "react-native-step-indicator";

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#8FFA09",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#8FFA09",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#8FFA09",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#8FFA09",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#8FFA09",
};

const labels = ["Design Details", "Measurements", "Uploads"];

const MyStepIndicator = ({ currentPosition }) => (
  <View style={{ flex: 1, padding: 20 }}>
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentPosition}
      labels={labels}
      stepCount={labels.length}
    />
  </View>
);

export default MyStepIndicator;
