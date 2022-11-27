import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { styles } from './styles';

export default class extends React.Component {
    state = {
        title: "",
        keywords: [],
        summary: "",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/1200px-Question_mark_%28black%29.svg.png",
        sentiment: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = "https://web-production-3b7b.up.railway.app/analysisApi?" + this.props.route.params.url;
        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                this.setState({
                    title: resJson["title"],
                    keywords: resJson["keywords"],
                    summary: resJson["summary"],
                    image: resJson["image"],
                    sentiment: resJson["sentiment"],
                })
            })
    }

    render() {
        var senStyle;
        if (this.state.sentiment[0] == 'positive') {
            senStyle = styles.subArticlePos;
        } else {
            senStyle = styles.subArticleNeg;
        }

        var adjective;
        if (this.state.sentiment[1] <= .6) {
            adjective = "mostly unbiased";
        } else if (this.state.sentiment[1] <= .75) {
            adjective = "moderately biased";
        } else {
            adjective = "heavily biased";
        }

        var ruling = Math.round(this.state.sentiment[1] * 100) + "% " + this.state.sentiment[0] + " (" + adjective + ")";

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.queryView}>
                        <Text style={styles.subArticleText}>Showing results for {this.props.route.params.url}</Text>
                        <View style={styles.imageView}>
                            <Image style={styles.image} source={{ uri: this.state.image }} />
                        </View>
                        <Text style={styles.articleText}>{this.state.title}</Text>
                        <Text style={senStyle}>
                            {ruling}
                        </Text>
                        <Text style={styles.AIText}>Keywords:</Text>
                        <Text style={styles.subArticleText}>
                            {
                                this.state.keywords.map((word, index) => {
                                    return (
                                        word + ", "
                                    );
                                })
                            }
                        </Text>
                        <Text style={styles.AIText}>AI Generated Summary:</Text>
                        <Text style={styles.subArticleText}>{this.state.summary}</Text>
                        <Text onPress={() => { this.props.navigation.navigate("Display Article", { url: this.props.route.params.url, artSource: "Inputted URL", bias: ruling }) }} style={styles.subArticleLink}>
                            Read the full article
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}