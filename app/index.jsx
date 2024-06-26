import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";

import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    //  Wraps the entire app in a SafeAreaView component to ensure content is
    //  within the safe area of the device
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-[85vh] px-4">
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            {/* here is where the onboarding text message and color
            can be edited manually to display what we want to show */}
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with {""}
              <Text className="text-secondary-200">Bingly Bong</Text>
            </Text>
            <Image
              source={images.path}
              //TODO: fix the sizing so the orange underline sits directly beneath the Aora text
              className="w-[136px] h-[15px] absolute -bottom-2 -right-20 "
              resizeMode="contain"
            />
          </View>
          {/* //TODO: Update text to be relevant to the uni the Aora text */}
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Unlock a world of adventure with BinglyBong, your guide to the
            hidden corners and vibrant events of Waikato University.
          </Text>
          <CustomButton
            title="Continue With Email"
            handlePress={() => {
              // TODO: Temporary dev change to route directly to Home screen
              // This is a temporary change for development purposes to directly route to Home
              // To restore the original functionality, change the router.push back to '/sign-in'
              router.push("/home");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      {/* This allows us to control the visibility of the status bar where battery and volume etc are displayed
      depending on the app's theme and design */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
