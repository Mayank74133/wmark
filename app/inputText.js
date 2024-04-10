import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import Button from "../components/Button";
import { Link, router } from "expo-router";

export default function inputText() {
  const [fSize, setfSize] = useState("20");
  const [bgcolor, setBgcolor] = useState("black");
  const [text, onChangeText] = useState("");
  var prop = {
    color: bgcolor,
    fontSize: parseInt(fSize),
  };

  const handleBtn = async () => {
    await SecureStore.setItemAsync("wType", "TXT");
    await SecureStore.setItemAsync("markText", text);
    await SecureStore.setItemAsync("Property", JSON.stringify(prop));
    router.push("/selection");
  };
  return (
    <View>
      <Text style={mayank.text}>Enter Watermark Text</Text>

      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={mayank.input}
      />

      <Text style={mayank.text}> Pick Text Color </Text>
      <Picker
        selectedValue={bgcolor}
        onValueChange={(itemValue, itemIndex) => setBgcolor(itemValue)}
        style={mayank.pick}
      >
        <Picker.Item label="Black" value="black" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Orange" value="orange" />
      </Picker>

      <Text style={mayank.text}>Pick Font Size </Text>
      <Picker
        selectedValue={fSize}
        onValueChange={(itemValue, itemIndex) => setfSize(itemValue)}
        style={mayank.pick}
      >
        <Picker.Item label="16" value="16" />
        <Picker.Item label="20" value="20" />
        <Picker.Item label="22" value="22" />
        <Picker.Item label="24" value="24" />
        <Picker.Item label="28" value="28" />
        <Picker.Item label="30" value="30" />
        <Picker.Item label="32" value="32" />
      </Picker>

      <Text style={mayank.text}>Your Text will appear like this ..</Text>

      <View style={mayank.text2}>
        <Text style={prop}>{text}</Text>
      </View>

      <Button theme="primary" label="Submit Logo" onPress={handleBtn} />
    </View>
  );
}

const mayank = {
  text: {
    fontSize: 22,
    marginHorizontal: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  text2: {
    margin: 12,
    padding: 10,
    borderRadius: 12,
  },
  pick: {
    marginVertical: 0,
  },
};
