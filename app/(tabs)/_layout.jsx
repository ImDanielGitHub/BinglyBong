// Imports specific components from the 'react-native' library
import { View, Text, Image } from "react-native";
// Imports the Tabs component and Redirect (unused here) from the 'expo-router' package for navigation
import { Tabs, Redirect } from "expo-router";

// Imports an icons object from a relative path, which contains various icon images
import { icons } from "../../constants";

// Defines a functional component to render an icon and label for tab navigation
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    // Creates a container for the icon and text with styling to centre items and set gaps
    <View className="items-center justify-center gap-2">
      {/* Displays an image (icon) with specific source, resizing mode, and tint
      color */}
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      {/* Displays text below the icon, with conditional styling based on whether
      the tab is focused */}
      <Text
        className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

// Defines a functional component to layout the tab navigation structure
const TabsLayout = () => {
  return (
    // Fragment to group multiple children without adding extra nodes to the DOM
    <>
      {/* Configures the tab bar with specific options like colours and styling */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false, // Hides the default label text for each tab
          tabBarActiveTintColor: "#ffA001", // Sets the color of the tab icon when it is active
          tabBarInactiveTintColor: "#CDCDE0", // Sets the color of the tab icon when it is inactive
          tabBarStyle: {
            // Applies specific styles to the tab bar itself
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColour: "#232533",
            height: 84,
          },
        }}
      >
        {/* Defines individual screens within the tab navigator, configuring each
        with a custom icon and settings */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false, // Hides the header for the screen
            tabBarIcon: ({ color, focused }) => (
              // Uses the TabIcon component to render the icon for this tab
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />{" "}
        <Tabs.Screen
          name="maps"
          options={{
            title: "Maps",
            headerShown: false, // Hides the header for the screen
            tabBarIcon: ({ color, focused }) => (
              // Uses the TabIcon component to render the icon for this tab
              <TabIcon
                icon={icons.maps}
                color={color}
                name="Maps"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            title: "Help",
            headerShown: false, // Hides the header for the screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.help}
                color={color}
                name="Help"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false, // Hides the header for the screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false, // Hides the header for the screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false, // Hides the header for the screen
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

// Makes the TabsLayout component available for use in other parts of the app
export default TabsLayout;
