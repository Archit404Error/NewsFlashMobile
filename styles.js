import * as React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'black',
    },
    modalContainer: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        padding: 10,
        flex: 1,
    },
    modalButton: {
        backgroundColor: '#1e2022',
        padding: 5,
        margin: 5,
        opacity: 0.75,
    },
    modalButtonText: {
        fontSize: 20,
        color: 'white',
    },
    queryView: {
        backgroundColor: '#1e2022',
        marginBottom: 5,
        padding: 10,
    },
    imageView: {
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 300,
        borderRadius: 10,
    },
    header: {
        fontSize: 50,
        marginTop: 200,
        marginBottom: 15,
        color: '#2d6ff4',
    },
    subHeader: {
        fontSize: 40,
        marginBottom: 5,
        color: '#2d6ff4',
        fontWeight: 'bold',
    },
    boldSectionHeader: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    articleText: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: 'white',
    },
    subArticleText: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#9ea6ad',
    },
    subArticleSource: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#a769ff',
    },
    subArticleConservative: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#c90000',
    },
    subArticleLiberal: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#6987ff',
    },
    subArticleCategory: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#d48600',
    },
    subArticleLink: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#2d6ff4',
    },
    subArticleDem: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#34aeeb',
    },
    subArticleRep: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#750701',
    },
    AIText: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#34c9eb',
    },
    smallText: {
        color: 'white',
        marginLeft: 15,
        marginBottom: 5,
        fontSize: 15,
    }
});