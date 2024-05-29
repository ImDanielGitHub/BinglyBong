import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View, Dimensions, Button } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

// npx expo install react-native-maps
// npx expo install expo sharing
// npx expo install expo-file-system
// npx expo install expo-location

// npx expo start

export default function HomeScreen() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78954787872753,
    longitude: 17.31739431718995,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };
  useEffect(() => {
    userLocation();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 items-center justify-center">
        <MapView
          region={mapRegion}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.8,
          }}
        >
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
        <Button title="Get Location" onPress={userLocation} />
      </View>
    </SafeAreaView>
  );
}
