import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useScrollToTop } from '@react-navigation/native';

export default ({ navigation }) => {
    return (
        <Onboarding
            pages = {
                [
                    {
                        backgroundColor: 'white',
                        title: 'Testing Page One'
                    },
                    {
                        backgroundColor: 'white',
                        title: 'Testing Page Two'
                    },
                ]
            }
            onDone = { navigation.navigate("HomeTab") }
        />
    )
}