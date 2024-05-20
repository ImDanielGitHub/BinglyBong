// Import necessary React Native components for building the interface
import { View, Text, ScrollView, Image, Alert } from "react-native";

import "react-native-url-polyfill/auto";

// Import React to use features like components and state
import React from "react";

// Import SafeAreaView for handling safe area issues on different devices (like notches)
import { SafeAreaView } from "react-native-safe-area-context";

// Import useState for managing component state
import { useState } from "react";

// Import image assets from a predefined constants file
import { images } from "../../constants";

// Import Link for navigation between screens
import { Link, router } from "expo-router";

// Import custom reusable components for the form fields and buttons
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";

// Import a function to handle user creation through Appwrite backend service
import { createUser } from "../../lib/appwrite";

// Define the SignUp functional component
const SignUp = () => {
  // State to manage submission status (loading indicator or similar)
  const [isSubmitting, setisSubmitting] = useState(false);
  // Initialize state for form fields with default values
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to handle form submission
  const submit = async () => {
    // Check if all form fields are filled
    if (!form.email || !form.password || !form.username) {
      // Show an alert if any field is empty
      Alert.alert(
        "Incomplete Details",
        "Please make sure all fields are filled in to continue."
      );
    }

    // Setting state to true indicates a process is happening (e.g., form validation)
    setisSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      //set to global state

      console.log("Attempting to route to home");

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Render method for the component, describes UI structure
  return (
    // SafeAreaView component used to render content within the safe area boundaries of a device
    <SafeAreaView className="bg-primary h-full">
      {/* ScrollView allows for scrolling through content if it exceeds the
      screen size */}
      <ScrollView>
        {/* // Main container for content with styling for alignment and spacing */}
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          {/* // Image component for displaying the logo */}
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          {/* // Text component for the signup screen title */}
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            Sign Up to Aora
          </Text>
          {/* // Form field for username input */}
          <Formfield
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          {/* // Form field for email input */}
          <Formfield
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          {/* // Form field for password input */}
          <Formfield
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          {/* // Custom button component that triggers the submit function */}
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            islLoading={isSubmitting}
          />
          {/* // Container for text and link to navigate to the sign-in screen */}
          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            {/* // Link component to navigate to the sign-in screen */}
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the SignUp component to be used in other parts of the app
export default SignUp;
