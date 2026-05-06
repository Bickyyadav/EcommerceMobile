import { View, Text } from 'react-native'
import React from 'react'
import SafeScreen from '../components/SafeScreen'
import { useLocalSearchParams } from 'expo-router'

const ProductId = () => {
    const { id } = useLocalSearchParams()
    console.log("💦💦💦💦💦💦🍌", id)
    return (
        <SafeScreen>
            <Text>{id}</Text>
            <View>hi there any one is here</View>
        </SafeScreen>
    )
}
export default ProductId


