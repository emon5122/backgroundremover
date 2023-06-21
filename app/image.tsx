import { useState } from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    StatusBar,
    Text,
    View,
} from "react-native";
import {
    requestMediaLibraryPermissionsAsync,
    requestCameraPermissionsAsync,
    launchCameraAsync,
    launchImageLibraryAsync,
    ImagePickerResult,
} from "expo-image-picker";
import axios from "axios";

const Details = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const maybeRenderUploadingIndicator = () => {
        if (uploading) {
            return <ActivityIndicator animating size="large" color="#0000ee" />;
        }
    };

    const maybeRenderControls = () => {
        if (!uploading) {
            return (
                <View>
                    <View style={{ marginVertical: 8 }}>
                        <Button
                            onPress={pickImage}
                            title="Select saved images"
                        />
                    </View>
                    <View style={{ marginVertical: 8 }}>
                        <Button onPress={takePhoto} title="Take a photo" />
                    </View>
                </View>
            );
        }
    };

    const maybeRenderImage = () => {
        if (image) {
            return (
                <View
                    style={{
                        marginTop: 30,
                        width: 250,
                        borderRadius: 3,
                        elevation: 2,
                        shadowColor: "rgba(0,0,0,1)",
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 4, height: 4 },
                        shadowRadius: 5,
                    }}
                >
                    <View
                        style={{
                            borderTopRightRadius: 3,
                            borderTopLeftRadius: 3,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            source={{ uri: image }}
                            style={{ width: 250, height: 250 }}
                        />
                    </View>

                    <Image
                        style={{ paddingVertical: 10, paddingHorizontal: 10 }}
                        source={{ uri: image }}
                    />
                </View>
            );
        }
    };

    const askPermission = async (failureMessage: string) => {
        const { status } = await requestMediaLibraryPermissionsAsync();

        if (status === "denied") {
            alert(failureMessage);
        }
    };

    const askCameraPermission = async (failureMessage: string) => {
        const { status } = await requestCameraPermissionsAsync();
        if (status === "denied") {
            alert(failureMessage);
        }
    };

    const takePhoto = async () => {
        await askCameraPermission(
            "Camera permission is required to take picture"
        );
        let pickerResult = await launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        handleImagePicked(pickerResult);
    };

    const pickImage = async () => {
        await askPermission(
            "We need the camera-roll permission to read pictures from your phone..."
        );

        let pickerResult = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        handleImagePicked(pickerResult);
    };

    const handleImagePicked = async (pickerResult: ImagePickerResult) => {
        try {
            setUploading(true);
            if (!pickerResult.canceled) {
                const { uri } = pickerResult.assets[0];
                
            }
        } catch (e) {
            console.error(e);
        } finally {
            setUploading(false);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {maybeRenderControls()}
            {maybeRenderUploadingIndicator()}
            {maybeRenderImage()}

            <StatusBar barStyle="default" />
        </View>
    );
};

export default Details;
