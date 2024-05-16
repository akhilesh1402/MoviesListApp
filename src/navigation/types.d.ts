import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type RootStackNavigatorParamList = {
  Login: undefined;
  Movies: undefined;
};

export type StackScreenNavigationProp = NativeStackNavigationProp<
  RootStackNavigatorParamList,
  LinkingOptions,
  Movies
>;
