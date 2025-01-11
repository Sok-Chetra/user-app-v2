import { OnBoardPage } from "../types/onboard-page/types";

export const onboardPages: OnBoardPage[] = [
    {
        id: 1,
        title: 'Hello!',
        desc: 'Welcome to User App! You choose the right app.',
        lottieImage: require('@/assets/lottie-animation/digital-portal.json'),
        textColor: '#FB773C',
        descColor: '#ffffff',
        backgroundColor: '#522258',
        lottieBackgroundColor: 'white'
    },
    {
        id: 2,
        title: 'Track Workers',
        desc: 'You can tracks the processing of worker and chat directly to them.',
        lottieImage: require('@/assets/lottie-animation/warehouse-delivery.json'),
        textColor: '#00FF9C',
        descColor: '#ffffff',
        backgroundColor: '#334756',
        lottieBackgroundColor: 'white'
    },
    {
        id: 3,
        title: 'Social Media',
        desc: 'You can post your jobs or projects to let people see it.',
        lottieImage: require('@/assets/lottie-animation/newsfeed.json'),
        textColor: '#D89216',
        descColor: '#ffffff',
        backgroundColor: '#7B113A',
        lottieBackgroundColor: 'white'
    },
    {
        id: 4,
        title: 'Security',
        desc: 'Your information has been encrypted to make sure it secure.',
        lottieImage: require('@/assets/lottie-animation/secure-data.json'),
        textColor: '#BBE1FA',
        descColor: '#ffffff',
        backgroundColor: '#1F4068',
        lottieBackgroundColor: 'white'
    }
]