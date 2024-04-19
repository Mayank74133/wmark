import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { Camera } from "expo-camera";
import React from "react";
import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";
import EmojiSticker from "../components/EmojiSticker";
const PlaceholderImage = require("../assets/images/image.png");
import * as SecureStore from "expo-secure-store";
import { DotIndicator } from "react-native-indicators";
import { Dimensions } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

export default function Page() {
  const [loader, setLoader] = useState(false);
  const itrRef = useRef(0);
  const temp = useRef(null);
  const logoRef = useRef(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [wType, setWType] = useState("");
  const [wVal, setWVal] = useState("");
  const [wPrp, setWPrp] = useState("");
  const [wwidth, setWwidth] = useState(0);
  const [wheight, setWheight] = useState(0);


  useEffect(() => {
    setWwidth(Dimensions.get("window").width - 20);
    setWheight(Dimensions.get("window").height - 200);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera was denied");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const sessionData = await SecureStore.getItemAsync("sessionData");
      const tempData = await SecureStore.getItemAsync("Property");
      const tempData1 = await SecureStore.getItemAsync("markText");
      const tempData2 = await SecureStore.getItemAsync("wType");

      setWPrp(JSON.parse(tempData));
      setWVal(tempData1);
      setWType(tempData2);

      if (sessionData === null) {
        loadLogo();
      } else {
        setPickedEmoji(sessionData);
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
    } else {
      alert("You did not select any Logo.");
    }
  };

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const selectPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      height: wheight,
      width: wwidth,

    });

    if (result) {
      temp.current = result.assets;
      setSelectedImage(result.assets[0].uri);
      setLoader(1);
      if (temp.current.length == 1) {
        temp.current = null;
        setTimeout(() => {
          onSaveImageAsync();
          setLoader(0);
          setSelectedImage(null);
        }, 3000);
      } else {
        setLoader(1);
        setTimeout(() => {
          startIteration();
        }, 3000);
      }
    }
  };

  const startIteration = async () => {
    await onSaveImageAsync();
    itrRef.current = itrRef.current + 1;

    if (itrRef.current === temp.current.length) {
      itrRef.current = 0;
      setSelectedImage(null);
      setLoader(0);
      return;
    }

    setSelectedImage(temp.current[itrRef.current].uri);

    setTimeout(startIteration, 2000);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: wheight,
        wwidth: wwidth,
        quality: 1,
        format: "png",
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
    } catch (e) {
    }
  };


  return (
    <>

      <GestureHandlerRootView style={styles.container}>

        <View style={styles.imageContainer}>
          <Pressable style={{
            padding: 3,
            borderColor: "yellow",
            borderWidth: 2,
            borderRadius: 100,
            width: 40
          }} >
            <FontAwesome6 name="backward" size={24} color="white" />
          </Pressable>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              style={{
                width: wwidth, height: wheight
              }}
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {!selectedImage ? (
              <View
                style={{
                  height: wheight,
                  width: wwidth
                }}
              ></View>
            ) : (
              ""
            )}

            <EmojiSticker
              imageSize={100}
              stickerSource={pickedEmoji}
              type={wType}
              val={wVal}
              valProp={wPrp}
            />

          </View>
        </View>

        {!loader ? (
          <View style={styles.footerContainer}>
            <View>
              <Button
                theme="primary"
                label="Select Images"
                onPress={selectPicture}
              />
            </View>
            <View style={styles.footerContainer2}>
              <Button
                theme="reset"
                label="Reset Logo"
                onPress={() => {
                  router.replace("/");
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "white",
              height: 100,
              marginTop: 250,
              marginBottom: 50,
            }}
          >
            <DotIndicator
              color="#00ff12"
              style={{ backgroundColor: "#26282c" }}
            />
          </View>
        )}
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 5,
  },
  footerContainer: {
    paddingTop: 200,
    flex: 1 / 3,
    alignItems: "center",
  },
  footerContainer2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
