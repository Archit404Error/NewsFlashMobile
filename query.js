import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { styles } from './styles';

export default class extends React.Component {
    state = {
        jsonData: {
            "parsed_articles": [],
            "sentiments": [],
            "topic": "",
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var query = this.props.route.params.query;
        query = query.replace(' ', '+');
        query = 'https://web-production-3b7b.up.railway.app/api?' + query;
        fetch(query)
            .then(response => response.json())
            .then(resList => this.setState({ jsonData: resList }))
    }

    render() {
        var parsedObj = this.state.jsonData["parsed_articles"];
        var sentiments = this.state.jsonData["sentiments"];
        var query = this.state.jsonData["topic"];
        var sources = [];
        if (JSON.stringify(parsedObj) != "{}") {
            for (var source in parsedObj) {
                sources.push(source);
            }
            sources.sort((first, second) => {
                if (sentiments[first][1] > sentiments[second][1]) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {this.state.jsonData["topic"] == "" &&
                        <ActivityIndicator size="large" />
                    }
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.subHeader}>{query}</Text>
                        <Text style={{ color: '#9ea6ad', fontSize: 20, marginBottom: 20 }}>
                            {this.state.jsonData["topic"] != "" &&
                                <Text style={{ fontWeight: 'bold' }}>
                                    Note: Results are ordered by bias.
                                </Text>
                            }
                        </Text>
                    </View>
                    {
                        sources.map((source, index) => {
                            var parsedArr = parsedObj[source]
                            var sentArr = sentiments[source];
                            var articleUrl = parsedArr[0];
                            var title = parsedArr[1];
                            var summary = parsedArr[2];
                            var bias = parsedArr[3];
                            var biasStyle, sentStyle;
                            if (bias == "liberal") {
                                biasStyle = styles.subArticleLiberal;
                            } else if (bias == "conservative") {
                                biasStyle = styles.subArticleConservative;
                            } else {
                                biasStyle = styles.subArticleText;
                            }
                            if (sentArr[0] == "positive") {
                                sentStyle = styles.subArticlePos;
                            } else {
                                sentStyle = styles.subArticleNeg;
                            }
                            var adjective;
                            if (sentArr[1] <= .6) {
                                adjective = "mostly unbiased";
                            } else if (sentArr[1] <= .75) {
                                adjective = "moderately biased";
                            } else {
                                adjective = "heavily biased";
                            }
                            var biasStatement = Math.round(sentArr[1] * 100) + "% " + sentArr[0] + " (" + adjective + ")";
                            return (
                                <View key={index + " query"} style={styles.queryView}>
                                    <View key={index + " imageview"} style={styles.imageView}>
                                        <Image key={index + " image"} style={styles.image} source={{ uri: parsedArr[4] }} />
                                    </View>
                                    <Text key={index} style={styles.articleText}>
                                        {title}
                                    </Text>
                                    <View key={index + " row"} style={{ flexDirection: 'row' }}>
                                        <Text key={source} style={styles.subArticleSource}>
                                            {source}
                                        </Text>
                                        <Text key={bias + " " + source} style={biasStyle}>
                                            {bias}
                                        </Text>
                                    </View>
                                    <Text key={sentArr[1] + " " + source} style={sentStyle}>
                                        {biasStatement}
                                    </Text>
                                    <Text key={index + " AI"} style={styles.AIText}>AI Generated Summary:</Text>
                                    <Text key={source + " summary"} style={styles.subArticleText}>
                                        {summary}
                                    </Text>
                                    <Text key={source + " link"} onPress={() => { this.props.navigation.navigate("Display Article", { url: articleUrl, bias: biasStatement, artSource: source }) }} style={styles.subArticleLink}>
                                        Read the full article
                                    </Text>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}