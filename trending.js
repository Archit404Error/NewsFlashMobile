import React, { useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './constants';

class TrendingTopics extends React.Component {
    state = {
        trendingTopics: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const gatherTrending = () => {
            fetch(`${API_URL}/trendingApi`)
                .then(res => res.json())
                .then(resJson => resJson["trending_list"])
                .then(trending => this.setState({ trendingTopics: trending }))
        }
        gatherTrending();
        this.interval = setInterval(gatherTrending, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'left', padding: 10 }}>
                    <View>
                        <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#2d6ff4', marginTop: 10 }}>Trending Searches</Text>
                        {
                            this.state.trendingTopics.map((topic, index) => {
                                return (
                                    <View key={index + " view"} style={{ backgroundColor: '#1e2022', width: 2000, marginLeft: -10, marginTop: 5 }}>
                                        <View key={index + " row"}>
                                            <Text key={index} style={styles.articleText}>{topic}</Text>
                                            <Text key={index + " Search"} style={styles.subArticleLink}
                                                onPress={
                                                    () => {
                                                        navigation.navigate('Query Results', { query: topic });
                                                    }
                                                }>
                                                Search this topic
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        {
                            this.state.trendingTopics.length == 0 &&
                            <View style={{ backgroundColor: '#1e2022', width: 2000, marginLeft: -10, marginTop: 10 }}>
                                <Text style={styles.articleText}>No trending articles right now!</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default (props) => {
    const navigation = useNavigation();
    return <TrendingTopics {...props} navigation={navigation} />
}