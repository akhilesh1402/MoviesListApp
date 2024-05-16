import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { setSelectedLanguage } from '../store/slices/language';
import { RootState } from '../store/store';

const LanguagePicker: React.FC = () => {
  const dispatch = useDispatch();

  const [openList, setOpenList] = useState<Boolean>(false);

  const { t } = useTranslation();

  type Language = {
    label: string;
    value: string;
  };


  const languages: Language[] = [
    { label: t('english'), value: 'en' },
    { label: t('arabic'), value: 'ab' },
  ];

  let selectedLanguage = useSelector((state: RootState) => state.language.selectedLanguage);

  const setIntialLanguage = (): Language => {
    let i = languages.findIndex((lang) =>
      lang.value === selectedLanguage
    );
    return languages[i];
  }


  const [currLanguage, setCurrLanguage] = useState<Language>(setIntialLanguage());

  const toggleListView = () => {
    setOpenList(!openList);
  }
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={toggleListView} style={styles.picker}>
        <Text style={styles.pickerTitle}> {`${t('change')} ${t('language')}`}</Text>
      </TouchableOpacity>
      {
        openList && <>
          <FlatList
            data={languages}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrLanguage(item as any);
                }}
                style={
                  currLanguage?.value === item.value
                    ? styles.selectedLanguage
                    : styles.language
                }>
                <Text
                  style={
                    currLanguage?.value === item.value ? styles.selectedText : styles.text
                  }>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.saveBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                i18next.changeLanguage(currLanguage?.value);
                dispatch(setSelectedLanguage(currLanguage?.value));
                setOpenList(false);
              }}
              style={styles.saveBtn}>
              <Text style={styles.saveBtnTitle}>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </View >
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
    borderStyle: 'solid',
  },
  picker: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#B7C9E270',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  pickerTitle: {
    fontStyle: 'normal',
    fontSize: 14,
    color: '#11111190',
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: "100%"
  },
  saveBtnTitle: {
    color: '#111',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  saveBtnContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: "lightgrey"
  },
  language: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
  },
  selectedLanguage: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#eee',
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 14,
    color: '#576573',
  },
  selectedText: {
    fontSize: 14,
    color: '#111',
    fontWeight: 'bold',
  },



  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  loginHeader: {
    fontSize: 24,
    paddingBottom: 20,
    fontFamily: 'Arial',
    color: 'black',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#111',
    borderRadius: 10,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttonTitle: {
    fontSize: 20,
    fontFamily: 'Arial',
  },
  errorText: {
    alignSelf: 'flex-start',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: '200',
    color: 'red',
    fontSize: 15,
  },
  languageButton: {
    backgroundColor: '#24A0ED',
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },


  sTitle2: {
    paddingTop: 20,
    paddingBottom: 20,
    fontStyle: 'normal',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,

    color: '#576573',
  },
  languageItem: {
    height: 50,

    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  texts: {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    color: '#576573',

    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },


});

export default LanguagePicker;
