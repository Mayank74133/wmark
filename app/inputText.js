import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const [fSize, setfSize] = useState("20");
  const [bgcolor, setBgcolor] = useState("black");
  const [text, onChangeText] = useState("");
  var prop = {
    color: bgcolor,
    fontSize: parseInt(fSize),
  };

  const handleBtn = async () => {
    if (text == "") {
      alert("Text is Null");
    } else {
      await SecureStore.setItemAsync("wType", "TXT");
      await SecureStore.setItemAsync("markText", text);
      await SecureStore.setItemAsync("Property", JSON.stringify(prop));
      router.push("/selection");
    }
  };
  return (
    <View>
      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: 2,
          marginTop: 6,
          alignItems: "flex-start",
          width: "100%",
          marginLeft: 3,
        }}
        onPress={() => {
          router.replace("/");
        }}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <Text style={{ color: "black", fontSize: 18 }}>Back</Text>
      </Pressable>
      <View
        style={{
          marginTop: 10,
        }}
      >
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
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="Purple" value="purple" />
          <Picker.Item label="Pink" value="pink" />
          <Picker.Item label="Brown" value="brown" />
          <Picker.Item label="Gray" value="gray" />
          <Picker.Item label="Cyan" value="cyan" />
          <Picker.Item label="Magenta" value="magenta" />
          <Picker.Item label="Turquoise" value="turquoise" />
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
          <Picker.Item label="34" value="34" />
          <Picker.Item label="36" value="36" />
          <Picker.Item label="38" value="38" />
          <Picker.Item label="40" value="40" />
        </Picker>

        <Text style={mayank.text}>Your Text will appear like this ..</Text>

        <View style={mayank.text2}>
          <Text style={prop}>{text ? text : "Temporary Text"}</Text>
        </View>

        <Pressable style={mayank.btnContainer} onPress={handleBtn}>
          <Text
            style={{
              fontSize: 20,
              paddingVertical: 6,
              fontWeight: "500",
              textAlign: "center",
              marginTop: 1,
              color: "#fff",
              marginLeft: 30,
            }}
          >
            Proceed{" "}
          </Text>
          <AntDesign
            name="doubleright"
            size={25}
            color="#fff"
            style={{ marginTop: 7 }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const mayank = {
  text: {
    fontSize: 22,
    marginHorizontal: 12,
    fontWeight: 600,
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
  btnContainer: {
    textAlign: "center",
    paddingTop: 2,
    width: 170,
    borderRadius: 14,
    height: 50,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    borderColor: "#0073ff",
    borderWidth: 3,
    backgroundColor: "#0073cf",
    marginHorizontal: 100,
    marginVertical: 20,
  },
};
