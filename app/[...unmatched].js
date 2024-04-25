import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
// import Button from "../components/Button";
import * as SecureStore from 'expo-secure-store';
import { Link, router } from 'expo-router';
import * as Location from 'expo-location';
import axios from 'axios';
import { ImageBackground } from 'react-native';
import bgImg from '../public/images/1234.jpeg';
import bg_img from '../public/images/bg_image.jpg';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Page() {
	const logoRef = useRef(null);
	const [pickedEmoji, setPickedEmoji] = useState(null);

	// Location
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			if (status !== 'granted') {
				alert('Permission to access camera was denied');
			}
      
		let prevLogo = await SecureStore.getItemAsync('sessionData');
		let prevText = await SecureStore.getItemAsync('markText');

    
    if (prevLogo != null || prevText != null ) {
    
		console.log(prevLogo);
		console.log(prevText);
	
		let toast=Toast.show('Loading ....', {
        duration: Toast.durations.LONG,
        position:Toast.positions.BOTTOM,
        animation:true,
        hideOnPress:true,
        shadow:true,
        backgroundColor:'black',
        textColor:'white'
      });		
      setTimeout(()=>{
        Toast.hide(toast);
        router.push('/selection');
      },3000);
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
				'sessionData',
				result.assets[0].uri.toString()
			);
			await SecureStore.setItemAsync('wType', 'Image');
			router.replace('/selection');
		}
	};

	const [status, requestPermission] = MediaLibrary.usePermissions();

	if (status === null) {
		requestPermission();
	}

	return (
		<RootSiblingParent style={{ flex: 1 }}>
			<View>
				<Text
					style={{
						fontSize: 27,
						fontWeight: '700',
						color: 'black',
						textAlign: 'center',
						marginTop: 90,
					}}>
					"WaterMark Wise, Right Rise!
				</Text>
				<Text
					style={{
						fontSize: 25,
						fontWeight: '700',
						color: 'black',
						textAlign: 'center',
					}}>
					Secure It With A Signature"
				</Text>
			</View>

			<View style={styles.container}>
				<ImageBackground
					source={bgImg}
					style={styles.imageContainer}
				/>
				<Text
					style={{
						fontSize: 18,
						fontWeight: '600',
						color: 'black',
						textAlign: 'center',
						marginBottom: 18,
					}}>
					Upload Your logo or create your watermark, and apply it with a click.
				</Text>
				<View style={styles.mainBtnContainer}>
					<Pressable
						style={styles.btnContainer}
						onPress={loadLogo}>
						<AntDesign
							name="cloudupload"
							size={30}
							color="#fff"
							style={{ marginTop: 7, marginLeft: 25 }}
						/>
						<Text
							style={{
								fontSize: 18,
								paddingVertical: 6,
								fontWeight: '700',
								textAlign: 'center',
								marginTop: 3,
								color: '#fff',
							}}>
							Upload{' '}
						</Text>
					</Pressable>
					<Pressable
						style={styles.btnContainer1}
						onPress={() => {
							router.push('/inputText');
						}}>
						<MaterialIcons
							name="draw"
							size={30}
							color="#fff"
							style={{ marginTop: 7, marginLeft: 35 }}
						/>
						<Text
							style={{
								fontSize: 18,
								paddingVertical: 6,
								fontWeight: '500',
								textAlign: 'center',
								marginTop: 3,
								color: '#fff',
							}}>
							Text{' '}
						</Text>
					</Pressable>
				</View>
			</View>
		</RootSiblingParent>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 18,
	},
	imageContainer: {
		flex: 1,
		display: 'flex',
		alignContent: 'flex-end',
		justifyContent: 'flex-end',
		height: 450,
	},
	btnContainer1: {
		textAlign: 'center',
		paddingTop: 2,
		width: 150,
		borderRadius: 14,
		height: 55,
		display: 'flex',
		flexDirection: 'row',
		gap: 4,
		borderColor: '#045036',
		borderWidth: 3,
		backgroundColor: '#007C4F',
	},
	btnContainer: {
		textAlign: 'center',
		paddingTop: 2,
		width: 150,
		borderRadius: 14,
		height: 55,
		display: 'flex',
		flexDirection: 'row',
		gap: 4,
		borderColor: '#1A47A3',
		borderWidth: 3,
		backgroundColor: '#356ADB',
	},
	mainBtnContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		gap: 12,
		marginHorizontal: 10,
	},
	image: {
		flex: 1,
		width: '100%',
		backgroundColor: '#0553',
	},
});
