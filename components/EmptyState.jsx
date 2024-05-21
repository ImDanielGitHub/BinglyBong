import { View, Text, Image } from "react-native";
import React from "react";

import { images } from "../constants";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[270px]" resizeMode="contain" />
      <Text className="text-2xl font-psemibold text-white mt-6">{title}</Text>
      <Text className="text-sm text-gray-100 mt-2">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
