import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import SafeScreen from '../components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import ProductGrid from '../components/ProductGrid';
import useProducts from '../../hooks/useProducts';

const CATEGORIES = [
    { name: "All", icon: "grid-outline" as const },
    { name: "Electronics", image: require("@/assets/images/electronics.png") },
    { name: "Fashion", image: require("@/assets/images/fashion.png") },
    { name: "Sports", image: require("@/assets/images/sports.png") },
    { name: "Books", image: require("@/assets/images/books.png") },
];


const ShopScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { data: products, isLoading, isError } = useProducts();

    console.log("🍌🍌🍌🍌🍌🍌🍌");
    console.log(products);

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products;

        // filtering by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter((products) => products.category === selectedCategory.toLowerCase())
        }
        // filtering by searh query
        if (searchQuery.trim()) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }, [products, selectedCategory, searchQuery])

    return (
        <SafeScreen>
            <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* header */}
                <View className='px-6 pb-4 pt-6'>
                    <View className='flex-row justify-between items-center mb-6'>
                        <View>
                            <Text className='text-white text-3xl font-bold'>Shop</Text>
                            <Text className='text-white text-xs opacity-50'>Browse all products</Text>
                        </View>
                        <TouchableOpacity className='bg-surface/50 p-3 rounded-full' activeOpacity={0.7}>
                            <Ionicons name="options-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    {/* Search bar */}
                    <View className='bg-surface flex-row items-center px-5 py-4 rounded-2xl'>
                        <Ionicons name="search" size={22} color="#666" />
                        <TextInput placeholder='Search products' placeholderTextColor={'#B3B3B3'} className='flex-1 ml-3 text-base text-primary '
                            value={searchQuery} onChangeText={setSearchQuery} />
                    </View>
                </View>
                {/* CATEGORY FILTER */}
                <View className="mb-6">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    >
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategory === category.name;
                            return (
                                <TouchableOpacity
                                    key={category.name}
                                    onPress={() => setSelectedCategory(category.name)}
                                    className={`mr-3 rounded-2xl size-20 overflow-hidden items-center justify-center ${isSelected ? "bg-primary" : "bg-surface"}`}
                                >
                                    {category.icon ? (
                                        <Ionicons
                                            name={category.icon}
                                            size={36}
                                            color={isSelected ? "#121212" : "#fff"}
                                        />
                                    ) : (
                                        <Image source={category.image} className="size-12" resizeMode="contain" />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                    <View className="px-6 mb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-text-primary text-lg font-bold">Products</Text>
                            <Text className="text-text-secondary text-sm">{products?.length} items</Text>
                        </View>

                        {/* product grid */}
                        <ProductGrid products={filteredProducts} isLoading={isLoading} isError={isError} />
                    </View>

                </View>
            </ScrollView>
        </SafeScreen>
    )
}

export default ShopScreen