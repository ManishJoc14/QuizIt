import * as ImagePicker from 'expo-image-picker';

export async function pickImage(): Promise<{ uri: string; file: File } | null> {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        alert('Permission to access gallery is required!');
        return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
    });

    if (result.canceled) {
        return null;
    }

    const uri = result.assets[0].uri;

    // Fetch blob from local URI
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create File from blob (if File constructor available)
    // Adjust name and type as needed

    const file = new File([blob], 'photo.jpg', { type: blob.type });

    return { uri, file };
}
