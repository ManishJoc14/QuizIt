import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useAssets } from 'expo-asset';
import { getRandomImage } from '@/utils/functions/getRandomImage';
import { Button } from '../ui/Button';

export function Hero() {
  const [assets] = useAssets(require('@/assets/images/hero_image.png'));
  const { width } = Dimensions.get('window');

  // Make height responsive based on screen width
  const heroHeight = width > 1024 ? 500 : width > 768 ? 400 : 250;

  const heroImageUri =
    assets && assets[0]
      ? assets[0].localUri || assets[0].uri
      : getRandomImage(width, heroHeight);

  return (
    <View className="w-full my-4">
      <ImageBackground
        source={{ uri: heroImageUri }}
        resizeMode="cover"
        style={{
          width: '100%',
          height: heroHeight,
          borderRadius: 16,
          overflow: 'hidden',
        }}
        imageStyle={{
          borderRadius: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: width > 768 ? 24 : 16,
          }}
        >
          <Button
            title="LET'S PLAY"
            variant="outline"
            size={width > 768 ? 'lg' : 'md'}
            className="rounded-full shadow-2xl border-2"
            style={{
              width: width > 768 ? 180 : 140,
              paddingVertical: width > 768 ? 16 : 12,
              paddingHorizontal: width > 768 ? 24 : 16,
            }}
            textClassName={width > 768 ? 'text-lg' : 'text-md'}
            onPress={() => router.push('/(home)/trending')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
