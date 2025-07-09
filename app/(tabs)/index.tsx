import { ScrollView, View } from "react-native"

import { DiscoverSection } from "@/components/Home/HomeDiscoverSection"
import { Header } from "@/components/Home/HomeHeader"
import { Hero } from "@/components/Home/HomeHeroComponent"
import { TopAuthorsSection } from "@/components/Home/HomeTopAuthorsSection"
import { TrendingSection } from "@/components/Home/HomeTrendingSection"


export default function HomeScreen() {
  return (
    <View className="flex-1 pt-safe-offset-4 bg-gray-50 dark:bg-gray-950">
      <Header />
      <ScrollView className={'flex-1 px-6'} showsVerticalScrollIndicator={false}>
        <Hero />
        <DiscoverSection />
        <TopAuthorsSection />
        <TrendingSection />
      </ScrollView>
    </View>
  )
}
