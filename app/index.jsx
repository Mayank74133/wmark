import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Button } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import React from "react";
import * as ImagePicker from "expo-image-picker";
// import Button from "../components/Button";
import * as SecureStore from "expo-secure-store";
import { Link, router } from "expo-router";
import * as Location from "expo-location";
import axios from "axios";
import { ImageBackground } from "react-native";
import bgImg from "../public/images/12345.jpg";
import bg_img from "../public/images/bg_image.jpg";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function Page() {
  const logoRef = useRef(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  // Location
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera was denied");
      }
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        await axios
          .get("https://api.geoapify.com/v1/geocode/reverse", {
            params: {
              apiKey: "5d740836e3cb44d4896d132256a44e71",
              lon: location.coords.longitude,
              lat: location.coords.latitude,
            },
          })
          .then((res) => {
            let data = {
              street: res.data.features[0].properties.street
                ? res.data.features[0].properties.street
                : "" + ", " + res.data.features[0].properties.name
                ? res.data.features[0].properties.name
                : "" + ", " + res.data.features[0].properties.housenumber
                ? res.data.features[0].properties.housenumber
                : "",
              postcode: res.data.features[0].properties.postcode,
              city: res.data.features[0].properties.city,
              state: res.data.features[0].properties.state,
              country: res.data.features[0].properties.country,
            };

            setTimeout(async () => {
              await SecureStore.setItemAsync("datalct", JSON.stringify(data));
            }, 500);
          });
      } catch (err) {
        console.log("error coming is : ", err);
      }
    })();
  }, []);

  const loadLogo = async () => {
    setPickedEmoji(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedEmoji(result.assets[0].uri.toString());
      logoRef.current = result.assets[0].uri.toString();
      await SecureStore.setItemAsync(
        "sessionData",
        result.assets[0].uri.toString()
      );
      await SecureStore.setItemAsync("wType", "Image");
      router.replace("/selection"); // change this too
    } else {
      alert("You did not select any Logo.");
    }
  };

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  return (
    <ImageBackground
      source={bgImg}
      // resizeMode="cover"
      style={styles.imageContainer}
    >
      <View style={styles.container}>
        <View
          style={{
            margin: 2,
            display: "flex",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 27,
              fontWeight: "700",
              color: "yellow",
              textAlign: "center",
              marginTop:90
            }}
          >
            "WaterMark Wise, Right Rise!
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
              color: "white",
              textAlign: "center",
            }}
          >
            Secure It With A Signature"
          </Text>
        </View>
        <View style={{
          display:'flex',
          gap:10,
          marginBottom:25
        }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "turquoise",
              textAlign: "center",
            }}
          >
            Upload Your image, customize your watermark, and apply it with a
            click.
          </Text>
          <View style={styles.mainBtnContainer}>
            <Pressable style={styles.btnContainer} onPress={loadLogo}>
              <AntDesign
                name="cloudupload"
                size={30}
                color="black"
                style={{ marginTop: 7, marginLeft: 30 }}
              />
              <Text style={styles.btn}>Upload </Text>
            </Pressable>
            <Pressable
              style={styles.btnContainer}
              onPress={() => {
                router.push("/inputText");
              }}
            >
              <MaterialIcons
                name="draw"
                size={30}
                color="black"
                style={{ marginTop: 7, marginLeft: 40 }}
              />
              <Text style={styles.btn}>Text </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: "50",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    alignContent:"flex-end",
    justifyContent:"flex-end",
    // height:600
  },
  btn: {
    fontSize: 20,
    paddingVertical: 6,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 3,
  },
  btnContainer: {
    backgroundColor: "white",
    textAlign: "center",
    paddingTop: 2,
    width: 150,
    borderRadius: 14,
    height: 55,
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  mainBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent:'space-around',
    gap: 12,
    marginHorizontal: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
