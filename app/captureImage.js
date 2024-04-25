import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { Camera } from "expo-camera";
import React from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../components/ImageViewer";
import EmojiSticker from "../components/EmojiSticker";
const PlaceholderImage = require("../assets/images/logo_2.png");
import * as SecureStore from "expo-secure-store";
import { DotIndicator } from "react-native-indicators";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as IntentLauncher from 'expo-intent-launcher';

export default function Page(props) {
  const [loader, setLoader] = useState(false);
  const logoRef = useRef(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [wType, setWType] = useState("");
  const [wVal, setWVal] = useState("");
  const [wPrp, setWPrp] = useState("");
  const [wwidth, setWwidth] = useState(0);
  const [wheight, setWheight] = useState(0);

  const [lct, setlct] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera was denied");
      }
    })();
  }, []);

  useEffect(() => {
    setWwidth(Dimensions.get("window").width - 20);
    setWheight(Dimensions.get("window").height - 220);
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

     
    })();
  }, []);

 

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      setSelectedImage(photo.uri);
    }
    setLoader(true);

    setTimeout(async () => {
      await onSaveImageAsync();
      setLoader(false);
    }, 3000);
  };

  const onReset = () => {
    setSelectedImage(null);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: wheight,
        width: wwidth,
        quality: 1,
        format: "png",
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        // alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
    onReset();
  };

  const openGallery = async () => {
    if (Platform.OS == "ios") {
      Linking.openURL("photos-redirect://");
    } else {
      await IntentLauncher.startActivityAsync("android.intent.action.MAIN", {
        category: "android.intent.category.APP_GALLERY",
      });
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 2,
            marginTop: 6,
            alignItems: "flex-start",
            marginLeft: 3,
            borderWidth: 2,
            borderColor: "yellow",
            borderRadius: 100,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
          onPress={() => {
            router.replace("/selection");
          }}
        >
          <Ionicons name="chevron-back-sharp" size={19} color="white" />
          <Text style={{ color: "white", fontSize: 14 }}>Back</Text>
        </Pressable>
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 2,
            marginTop: 6,
            alignItems: "flex-start",
            marginLeft: 3,
            borderWidth: 2,
            borderColor: "yellow",
            borderRadius: 100,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
          onPress={async () => {
            await SecureStore.setItemAsync("sessionData", "");
            await SecureStore.setItemAsync("markText", "");
            router.replace("/");
          }}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Reset Logo</Text>
        </Pressable>
      </View>
      <View>
        <View
          ref={imageRef}
          collapsable={false}
          style={{ height: wheight, marginBottom: 10 }}
        >
          {selectedImage ? (
            <ImageViewer
              // ref={imageRef}
              style={styles.imageContainer}
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          ) : (
            <View
              style={{
                height: wheight,
                width: wwidth,
              }}
            >
              <Camera
                ref={(ref) => {
                  this.camera = ref;
                }}
                style={styles.imageContainer}
                type={cameraType}
              ></Camera>
            </View>
          )}
          <View>
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
          <View style={styles.footerContainer2}>
            <Pressable onPress={openGallery}>
              <View
                style={{
                  padding: 9,
                  borderWidth: 2,
                  borderRadius: 11,
                  borderColor: "yellow",
                }}
              >
              <Ionicons name="grid" size={16} color="white" />

              </View>
            </Pressable>
            <Pressable onPress={takePicture}>
              <View
                style={{
                  padding: 5,
                  borderWidth: 2,
                  borderColor: "yellow",
                  borderRadius: 100,
                }}
              >
                <View
                  style={{
                    padding: 12,
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 100,
                  }}
                >
                  <FontAwesome6 name="camera" color="white" size={26} />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={toggleCameraType}>
              <View
                style={{
                  padding: 9,
                  borderWidth: 2,
                  borderRadius: 11,
                  borderColor: "yellow",
                }}
              >
                <FontAwesome6 name="camera-rotate" size={20} color="white" />
              </View>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              height: 100,
            }}
          >
            <DotIndicator color="#00ff12" style={{ backgroundColor: "#000" }} />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
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
    backgroundColor: "red",
  },
  footerContainer: {
    paddingTop: 265,
    flex: 1 / 3,
    alignItems: "center",
  },
  footerContainer2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 30,
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
  location: {
    color: "yellow",
    width: 330,
    padding: "4px",
  },
  locationView: {
    width: 350,
    padding: 4,
    paddingLeft: 10,
    top: -120,
  },
});
