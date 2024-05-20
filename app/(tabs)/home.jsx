import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text>{item.id}</Text>}
      />
    </SafeAreaView>
  );
};

export default Home;
