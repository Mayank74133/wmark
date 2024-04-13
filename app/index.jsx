
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View,  Text, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera'
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import * as SecureStore from 'expo-secure-store';
import { Link, router } from "expo-router";
import * as Location from "expo-location";
import axios from "axios"
import { ImageBackground } from 'react-native';
import bgImg from "../public/images/background.jpg"
export default function Page() {

  const logoRef = useRef(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);

    // Location
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [lct, setlct] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera was denied');
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
    
            setTimeout(async() => {
              setlct(data);
              await SecureStore.setItemAsync('datalct',JSON.stringify(data));
            }, 500);
          });
      } catch (err) {
        console.log("error coming is : ", err);
      }
    })();

  },[])

  const loadLogo = async () => {
    setPickedEmoji(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {

      setPickedEmoji(result.assets[0].uri.toString());
      logoRef.current = result.assets[0].uri.toString();
      await SecureStore.setItemAsync('sessionData', result.assets[0].uri.toString());
      await SecureStore.setItemAsync('wType','Image')
      router.replace("/selection");                                                            // change this too

    } else {
      alert('You did not select any Logo.');
    }

  }

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  return (
        <View style={styles.container}>
        <ImageBackground source={bgImg} resizeMode='cover' style={styles.imageContainer}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 18,
              alignSelf: 'center',
              fontWeight: '600',
              color:'white'
            }}
          >Please Upload a Logo </Text>
          <Button theme="primary" label="Upload Logo" onPress={loadLogo} />
          <Button theme="primary" label="Text Logo"  onPress={()=>{router.push("/inputText")}} />
          </ImageBackground>
        </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent:'center'
  },
  footerContainer: {
    paddingTop: 200,
    flex: 1 / 3,
    alignItems: 'center',
  },
  footerContainer2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
