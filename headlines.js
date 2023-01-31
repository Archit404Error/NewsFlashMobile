import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, ActivityIndicator, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import SearchBar from "react-native-dynamic-search-bar";
import { useScrollToTop } from '@react-navigation/native';
import { API_URL } from './constants';

class Headlines extends React.Component {
  state = {
    topHeadlines: [],
    keywordPool: [],
    selectedKeywords: [],
    modalVisible: false,
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    date: new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const startup = () => {
      fetch(`${API_URL}/topApi`)
        .then(res => res.json())
        .then(topList => topList["top_articles"][0])
        .then((topArticles) => {
          this.setState({ topHeadlines: topArticles, date: this.state.months[new Date().getMonth()] + " " + new Date().getDate() })
        })
    }
    startup();
    this.interval = setInterval(startup, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView ref={this.props.scrollRef} >
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginLeft: 10, marginBottom: 0 }}>{this.state.date}</Text>
          <Text style={{ fontSize: 45, fontWeight: 'bold', color: '#2d6ff4', marginBottom: 10, marginLeft: 10, marginTop: 0 }}>NewsFlash</Text>
          <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#2d6ff4', marginTop: 10, marginLeft: 10, marginBottom: 10 }}>Top Headlines</Text>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <SafeAreaView style={styles.modalContainer}>
              <ScrollView>
                <Text style={styles.boldSectionHeader}>Tap one or more keywords:</Text>
                {this.state.selectedKeywords.length > 0 &&
                  <Text style={styles.smallText}>Tip: tap again on selected words to deselect</Text>
                }
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    this.state.selectedKeywords.map((keyword, index) => {
                      return (
                        <TouchableOpacity key={index + keyword + " Button"} style={styles.modalButton}
                          onPress={
                            () => {
                              let selectedCopy = [...this.state.selectedKeywords];
                              selectedCopy.splice(selectedCopy.indexOf(keyword), 1);

                              let keywordCopy = [...this.state.keywordPool];
                              keywordCopy.push(keyword);

                              this.setState({
                                topHeadlines: this.state.topHeadlines,
                                keywordPool: keywordCopy,
                                selectedKeywords: selectedCopy,
                              })
                            }
                          }>
                          <Text key={index + keyword} style={styles.modalButtonText}>{keyword}</Text>
                        </TouchableOpacity>
                      );
                    })
                  }
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    this.state.keywordPool.map((text, index) => {
                      return (
                        <TouchableOpacity key={index + " Button"}
                          onPress={
                            () => {
                              let selectedCopy = [...this.state.selectedKeywords];
                              selectedCopy.push(text);

                              let keywordCopy = [...this.state.keywordPool];
                              keywordCopy.splice(keywordCopy.indexOf(text), 1);

                              this.setState({
                                topHeadlines: this.state.topHeadlines,
                                keywordPool: keywordCopy,
                                selectedKeywords: selectedCopy,
                              })
                            }
                          }>
                          <Text key={index} style={styles.subArticleText}>{text}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>

                <TouchableHighlight
                  onPress={
                    () => {
                      let search = "";
                      this.state.selectedKeywords.forEach((text) => { search += text + " " });
                      search.trim();
                      this.state.modalVisible = false;
                      this.setState(this.state);
                      this.props.navigation.navigate("Query Results", { query: search })
                    }
                  }>
                  <Text style={styles.subArticleLink}>Search with selected keywords</Text>
                </TouchableHighlight>
                <View style={{ marginTop: 50, }}>
                </View>

                <Text style={styles.boldSectionHeader}>Or use custom search:</Text>

                <SearchBar
                  style={{ marginTop: 0, marginBottom: 30, marginLeft: -15, }}
                  placeholder="Enter a custom search instead..."
                  onClearPress={
                    () => {
                      setSearchText("");
                    }
                  }
                  onChangeText={
                    (text) => {
                      setSearchText(text);
                    }
                  }
                  onSubmitEditing={
                    () => {
                      this.state.modalVisible = false;
                      this.setState(this.state);
                      this.props.navigation.navigate("Query Results", { query: searchText })
                    }
                  }
                />

                <TouchableHighlight
                  onPress={() => {
                    this.state.modalVisible = false;
                    this.setState(this.state);
                  }}>
                  <Text style={styles.subArticleLink}>Return to top headlines</Text>
                </TouchableHighlight>
              </ScrollView>
            </SafeAreaView>
          </Modal>
          {this.state.topHeadlines.length == 0 &&
            <Text styles={styles.articleText}>Top headlines loading, check back soon...</Text>
          }
          {this.state.topHeadlines.length == 0 &&
            <ActivityIndicator size="small" />
          }

          {
            this.state.topHeadlines.map((sourceArr, index) => {
              console.log(sourceArr)
              const title = sourceArr[0];
              const source = sourceArr[1];
              const summary = sourceArr[2];
              const link = sourceArr[3];
              const image = sourceArr[4];
              const keywords = sourceArr[5];
              const topic = sourceArr[6];
              const sentArr = sourceArr[7];
              var sentStyle = "";
              if (sentArr[0] == "democratic") {
                sentStyle = styles.subArticleDem;
              } else {
                sentStyle = styles.subArticleRep;
              }
              var adjective;
              if (sentArr[1] <= .6) {
                adjective = "mostly unbiased";
              } else if (sentArr[1] <= .75) {
                adjective = "moderately biased";
              } else {
                adjective = "heavily biased";
              }
              var biasRuling = Math.round(sentArr[1] * 100) + "% " + sentArr[0] + " (" + adjective + ")";
              return (
                <View key={index + " View"} style={styles.queryView}>
                  <View key={index + " Image View"} style={styles.imageView}>
                    <Image key={index + " Image"} style={styles.image} source={{ uri: image }} />
                  </View>
                  <Text key={index} style={styles.articleText}>{title}</Text>
                  <View key={index + " Row"} style={{ flexDirection: 'row' }}>
                    <Text key={source + " " + index} style={styles.subArticleSource}>{source}</Text>
                    <Text key={topic} style={styles.subArticleCategory}>{topic}</Text>
                  </View>
                  <View key={index + " Modal Row"} style={{ flexDirection: 'row' }}>
                    <Text key={sentArr[1] + " " + source + " " + index} style={sentStyle}>
                      {biasRuling}
                    </Text>
                  </View>
                  <Text key={index + " Modal"} style={styles.subArticleLink}
                    onPress={
                      () => {
                        this.setState({
                          topHeadlines: this.state.topHeadlines,
                          keywordPool: keywords,
                          selectedKeywords: [],
                          modalVisible: true,
                        })
                      }}>
                    View similar headlines
                  </Text>
                  <Text key={summary} style={styles.subArticleText}>
                    {summary}
                  </Text>
                  <Text key={source + " link"}
                    onPress={() => { this.props.navigation.navigate("Display Article", { url: link, artSource: source, bias: biasRuling }) }}
                    style={styles.subArticleLink}
                  >
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

export default (props) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return <Headlines {...props} scrollRef={ref} />
}