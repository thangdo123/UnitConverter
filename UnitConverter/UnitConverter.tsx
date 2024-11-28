import { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const perUnitConversion: any = {
  Metre: {
    Millimetre: 1000,
    Mile: 0.000621371,
    Foot: 3.28084,
  },
  Millimetre: {
    Metre: 0.001,
    Mile: 6.2137e-7,
    Foot: 0.00328084,
  },
  Mile: {
    Metre: 1609.34,
    Millimetre: 1609350,
    Foot: 5280,
  },
  Foot: {
    Metre: 0.3048,
    Millimetre: 304.8,
    Mile: 0.000189394,
  },
};

const data = [
  { label: "Metre", value: "Metre" },
  { label: "Millimetre", value: "Millimetre" },
  { label: "Mile", value: "Mile" },
  { label: "Foot", value: "Foot" },
];

export default function UnitConverter() {
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [inputValue, setInputValue] = useState<any>();
  const [result, setResult] = useState<number>();

  const handleConvert = () => {
    if (fromUnit === toUnit) {
      setResult(inputValue);
    } else {
      if (isNaN(inputValue)) {
        Alert.alert("", "Please enter a valid number");
      } else {
        const conversionResult =
          Number(inputValue) * perUnitConversion[fromUnit][toUnit];
        setResult(conversionResult);
      }
    }
  };
  return (
    <View style={converterStyles.container}>
      <View
        style={[converterStyles.converterContainer, converterStyles.shadowProp]}
      >
        <View style={converterStyles.titleContainer}>
          <Text style={converterStyles.title}>Unit Converter</Text>
        </View>
        <View>
          <View>
            <Text style={converterStyles.text}>Enter your value</Text>
            <TextInput
              style={[converterStyles.input, converterStyles.shadowProp]}
              onChangeText={(e) => setInputValue(e)}
              value={inputValue}
              keyboardType="numeric"
            ></TextInput>
          </View>
        </View>

        <View style={converterStyles.converterItemDropdown}>
          <Dropdown
            style={dropdownStyles.dropdown}
            data={data}
            maxHeight={300}
            placeholderStyle={dropdownStyles.placeholder}
            labelField="label"
            valueField="value"
            placeholder="Pick an unit"
            value={fromUnit}
            onChange={(item) => {
              setFromUnit(item.value);
            }}
          />
          <Text>To</Text>
          <Dropdown
            style={dropdownStyles.dropdown}
            placeholderStyle={dropdownStyles.placeholder}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pick an unit"
            value={toUnit}
            onChange={(item) => {
              setToUnit(item.value);
            }}
          />
        </View>
        <Text style={converterStyles.text}>Result: {result}</Text>
        <Button
          color={"#6db2dd"}
          title="Convert"
          onPress={() => handleConvert()}
        />
      </View>
    </View>
  );
}

const converterStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  converterContainer: {
    backgroundColor: "#be95be",
    padding: 20,
    height: 400,
    justifyContent: "center",
    gap: 20,
    borderRadius: 40,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  converterItemDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#71a3c1",
  },
});

const dropdownStyles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "white",
    width: "40%",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 17,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholder: {
    opacity: 0.5,
  },
});
