import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { styles } from './styles';
import { API_URL } from './constants';

export default class extends React.Component {
    state = {
        articleData: {
            "title": "Loading...",
            "image": "",
            "full_text": "",
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch(`${API_URL}/fullArticle?${this.props.route.params.url}`)
            .then(response => response.json())
            .then(resList => this.setState({ articleData: resList }));
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{ alignItems: 'center', alignContent: 'center' }}>
                        <Text style={styles.articleText}>{this.state.articleData["title"]} - ({this.props.route.params.artSource})</Text>
                        {this.state.articleData["full_text"] != "" &&
                            <Text style={this.props.route.params.bias[4] == 'p' ? styles.subArticlePos : styles.subArticleNeg}>{this.props.route.params.bias}</Text>
                        }
                        {this.state.articleData["image"] != "" &&
                            <Image style={styles.image} source={{ uri: this.state.articleData["image"] }} />
                        }
                        <View style={{ height: 10 }}></View>
                        {this.state.articleData["full_text"] != "" &&
                            <Text style={styles.subArticleText}>{this.state.articleData["full_text"]}</Text>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}