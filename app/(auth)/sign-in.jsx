import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import "react-native-url-polyfill/auto";

//imports the images from the folder where they are unpacked
import { images } from "../../constants";

import { Link, router } from "expo-router";

// Imports all the custom components from the folder where they are stored
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { signIn, config, endAllSessions } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    // Check if all form fields are filled
    if (!form.email || !form.password) {
      // Show an alert if any field is empty
      Alert.alert(
        "Incomplete Details",
        "Please make sure all fields are filled in to continue."
      );
    }

    // Setting state to true indicates a process is happening (e.g., form validation)
    setisSubmitting(true);

    try {
      await signIn(form.email, form.password);

      //set to global state

      console.log("Attempting to route to home");

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.cards}
            className="max-w-[100px] w-full h-[100px]"
            resizeMode="contain"
          />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            Log in to your account
          </Text>
          <Formfield
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <Formfield
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            islLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
