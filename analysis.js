import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, ScrollView, ActivityIndicator, SafeAreaView, Button, Clipboard } from 'react-native';
import { SearchBar } from "react-native-elements";
import { styles } from './styles';

export default ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [errText, showErrText] = useState(false);

  const fetchCopied = async () => {
    showErrText(false);
    Clipboard.getString()
    .then((text) => {
      if(text != "" && (text.includes("http") || text.includes("www"))) {
        navigation.navigate("Nlp Results", { url: text })
      } else {
        showErrText(true);
      }
    });
  }

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style = {styles.subHeader}>Article Analysis</Text>
        <Text style = {{ color: '#9ea6ad', fontSize: 20, marginBottom: 5 }}>Analyze specific articles by URL</Text>
        <SearchBar
          placeholder="Enter Article URL"
          platform={Platform.OS}
          inputContainerStyle={{backgroundColor: '#343638', height: 40}}
          leftIconContainerStyle={{backgroundColor: '#343638'}}
          inputStyle={{backgroundColor: '#343638', color: 'white'}}
          containerStyle={{
            backgroundColor: 'black',
            width: 350,
          }}
          value = {searchText}
          onChangeText={(text) => { setSearchText(text)}}
          onClearPress={() => { setSearchText("")}}
          onSubmitEditing={() => { navigation.navigate("Nlp Results", {url: searchText}) }}
        />
        <Button title = "Use my clipboard instead" onPress = {() => {fetchCopied()}} />
        {
          errText && <Text style = {{ color: 'white', marginTop: 20, fontSize: 15 }}>Error: Make sure your url contains http, https, or www</Text>
        }
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
