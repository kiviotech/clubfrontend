// CheckoutStep.js
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
  stepStrokeUnFinishedColor: "#8FFA09",
  separatorFinishedColor: "#8FFA09",
  separatorUnFinishedColor: "#8FFA09",
  stepIndicatorFinishedColor: "#8FFA09",
  stepIndicatorUnFinishedColor: "#000000",
  stepIndicatorCurrentColor: "#8FFA09",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#000000",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#ffffff",
  labelSize: 13,
  currentStepLabelColor: "#8FFA09",
};

const labels = ["Shipping", "Payment", "Receipt"];

const CheckoutStep = ({ currentPosition }) => (
  <View style={{ flex: 1, padding: 20, backgroundColor: "#181818", maxHeight: 100}}>
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentPosition}
      labels={labels}
      stepCount={labels.length}
    />
  </View>
);

export default CheckoutStep;
