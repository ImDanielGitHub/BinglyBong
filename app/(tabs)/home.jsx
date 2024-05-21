import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
const Home = () => {
  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Daniel
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.cards}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            {/* //TODO: This is a search funtion for searching upcoming events map
            //could be placed here instead with the events showing at the bottom */}
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Events Tailored for You
              </Text>

              {/* //TODO: This is where the map will be displayed likley as a component
               all new features wil lbe created as componets  */}

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No events found"
            subtitle="Explore and create your own experiences!"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
