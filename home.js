import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Text, View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { SearchBar } from "react-native-elements";
import { styles } from './styles';
import Trending from './trending';

export default ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SearchBar
          placeholder="Learn about any topic"
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
          onSubmitEditing={
            () => {
              navigation.navigate('Query Results', { query : searchText })
            }
          }
        />
        { searchText != "" &&
          <Text style = {styles.smallText}>Tip: Press Enter to search</Text>
        }
        <Trending />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
