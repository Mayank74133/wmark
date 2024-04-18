import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import cImg from "../public/images/camera.jpg";
import gImg from "../public/images/gallery.jpg";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Page() {
  return (
    <View style={{
      flex:1
    }}>
 
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal:10,
            gap:35,
            backgroundColor:'#F7F6F5',
            flex:1,
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <Image source={gImg} style={styles.Image} />

          <Link href="/imageSelector" asChild>
            <Pressable style={styles.btnContainer}>
              <MaterialIcons
                name="browse-gallery"
                size={25}
                color="#fff"
                style={{ marginTop: 7, marginLeft: 15 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  paddingVertical: 6,
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: 1,
                  color: "#fff",
                }}
              >
                Browse Image{" "}
              </Text>
            </Pressable>
          </Link>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap:35,
            marginHorizontal:10,
            backgroundColor:'#ECEAE8',
            flex:1,
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <Image source={cImg} style={styles.Image} />
          <Link href="/captureImage" asChild>
            <Pressable style={styles.btnContainer}>
              <FontAwesome5
                name="camera-retro"
                size={25}
                color="#fff"
                style={{ marginTop: 7, marginLeft: 13 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  paddingVertical: 6,
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: 1,
                  color: "#fff",
                }}
              >
                Capture Image
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    textAlign: "center",
    paddingTop: 2,
    width: 180,
    borderRadius: 14,
    height: 50,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    borderColor: "#0073ff",
    borderWidth: 3,
    backgroundColor: "#0073cf",
    marginVertical: 45,
  },
  Image: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
});
