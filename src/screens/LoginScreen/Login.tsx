import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import { userLoginSuccess } from '../../store/slices/userAuthDetails';
import { StackScreenNavigationProp } from '../../navigation/types';
import { TOKEN } from '../../utils/constants'
import useValidateLogin from '../../hooks/useValidateLogin';
import LanguagePicker from '../../components/LanguagePicker';



const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch();
    const navigation = useNavigation<StackScreenNavigationProp>();
    const [emailError, passwordError] = useValidateLogin(email, password);
    const { t } = useTranslation();

    let loginBtnDisabled = !(email?.length > 0 && password?.length > 0 && !emailError && !passwordError);

    const onPressLogin = () => {
        dispatch(userLoginSuccess(TOKEN));
        navigation.navigate("Movies");
    };



    return (
        <View style={styles.container}>
            <View style={{ width: "100%", borderWidth: 2.5, borderColor: "lightgrey", backgroundColor: "#f2f2f2", alignItems: "center", padding: 10, borderRadius: 15 }}>
                <Text style={styles.loginHeader}>{t("login")}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t("email")}
                    value={email}
                    onChangeText={setEmail}
                    testID="emailInput" />
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder={t("password")}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    testID="passwordInput" />
                {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                <TouchableOpacity
                    disabled={loginBtnDisabled}
                    onPress={onPressLogin}
                    testID="loginButton" style={{ ...styles.button, backgroundColor: loginBtnDisabled ? "grey" : "#111" }}>
                    <Text style={{ ...styles.buttonTitle, color: loginBtnDisabled ? "lightgrey" : "white" }} >{t("submit")}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", paddingVertical: 20 }}>
                <LanguagePicker />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "white"
    },
    loginHeader: {
        fontSize: 24,
        paddingBottom: 20,
        fontFamily: 'Arial',
        color: 'black'
    },
    input: {
        width: '100%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#111',
        borderRadius: 10,
        backgroundColor: "white"
    },
    button: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    buttonTitle: {
        fontSize: 18,
        fontFamily: 'Arial',
    },
    errorText: {
        alignSelf: "flex-start",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "200",
        color: "red",
        fontSize: 15
    },

});

export default Login;