import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import z from "zod";
import axios from "axios";
import { Link } from "expo-router";

const App = () => {
    const [data, setData] = useState<usersData>();
    const userData = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email().toLowerCase(),
        username: z.string().toLowerCase(),
        phone: z.string(),
        website: z.string().transform((url) => {
            return `https://${url}`;
        }),
        company: z.object({
            name: z.string(),
            catchPhrase: z.string(),
            bs: z.string(),
        }),
        address: z.object({
            street: z.string(),
            suite: z.string(),
            city: z.string(),
            zipcode: z.string(),
            geo: z.object({
                lat: z.string(),
                lng: z.string(),
            }),
        }),
    });

    const usersData = z.array(userData);
    type usersData = z.infer<typeof usersData>;
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                const dt = usersData.parse(res.data);
                setData(dt);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <View className="flex-1 items-center justify-center bg-slate-900">
            <Link
                href={"/image"}
                className="bg-yellow-200 w-full justify-center text-center rounded-md mt-6"
            >
                Image
            </Link>
            <ScrollView
                className="mt-2 w-full"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {data?.map((user) => (
                    <Pressable
                        onPress={() => {
                            alert(user.name);
                        }}
                        key={user.id}
                        className="mb-2 w-full flex flex-col items-center text-red-700 bg-red-600 p-4 self-center rounded-lg shadow shadow-red-500/50"
                    >
                        <Text className="text-white">{user.name}</Text>
                        <Text className="text-white">{user.email}</Text>
                        <Text className="text-white">{user.company.name}</Text>
                        <Text className="text-white">{user.phone}</Text>
                        <Text className="text-white">{user.website}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};
export default App;
