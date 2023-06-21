import { Stack } from "expo-router";

const RootLayout = () => {
    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerBlurEffect: "systemMaterialLight",
                headerTitle: "Home",
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    headerBlurEffect: "dark",
                    headerStyle: {
                        backgroundColor: "red",
                    },
                    headerTitleAlign: "center",
                }}
            />
            <Stack.Screen
                name="image"
                options={{ headerShown: true, headerBlurEffect: "dark" }}
            />
        </Stack>
    );
};

export default RootLayout;
