import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackNavigatorParamList, StackScreenNavigationProp } from "./types";
import Login from "../screens/LoginScreen/Login";
import Movies from "../screens/MoviesScreen/Movies";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { userLogout } from "../store/slices/userAuthDetails";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

const RootStack = () => {
    const isLoggedIn = useSelector((state: RootState) => state.userAuthDetails.isLoggedIn);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation<StackScreenNavigationProp>();

    const signOutUser = () => {
        dispatch(userLogout());
        AsyncStorage.clear();
        navigation.navigate("Login");

    }
    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? "Movies" : "Login"} >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Movies" component={Movies} options={{
                title: t('movies'), headerRight: () => {
                    return (
                        <TouchableOpacity
                            style={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}
                            onPress={signOutUser}>
                            <Text>{t('signout')}</Text>
                        </TouchableOpacity>);
                }
            }} />
        </Stack.Navigator>);
}

export const Routes = () => {
    return <NavigationContainer><RootStack /></NavigationContainer>
}