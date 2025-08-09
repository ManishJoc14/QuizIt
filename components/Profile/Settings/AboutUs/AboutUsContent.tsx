import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
    Pressable
} from 'react-native';
import { useGetAboutUsQuery } from '@/services/featureApi';

export function AboutUsContent() {
    const { data: aboutUsData, isLoading, error } = useGetAboutUsQuery();

    const handleLinkPress = (url: string) => {
        if (url) Linking.openURL(url);
    };

    if (isLoading) {
        return (
            <View className="px-4 mb-6 items-center justify-center py-8">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="text-gray-400 mt-2">Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="px-4 mb-6">
                <Text className="text-red-500 text-center">
                    Failed to load About Us. Please try again later.
                </Text>
            </View>
        );
    }

    return (
        <View className="px-8 mb-10">
            {/* App Icon and Title */}
            <View className="items-center mb-8 border-b border-gray-700 pb-5">
                {/* <Image
                    source={require('@/assets/images/icon.png')}
                    className="w-20 h-20 mb-2"
                    resizeMode="contain"
                /> */}
                <Text className="text-violet-400 text-5xl font-bold mb-2">QuizIt</Text>
                <Text className="text-amber-400 text-base font-medium">&lt; DBMS Final Project /&gt;</Text>
            </View>

            <View className='flex-col sm:flex-row gap-6'>
                {/* Intro Sections */}
                <Section title="Introduction">
                    {`We're`} a community-driven quiz platform where curiosity meets competition.
                    Whether {`you're`} a student, teacher, or trivia lover we help you learn, test, and grow
                    through fun and interactive quizzes.
                </Section>

                <Section title="Our Story">
                    This platform began as a DBMS project assigned by our sir.
                    What started as a classroom task turned into a fun, interactive quiz system built to make learning engaging and competitive.
                </Section>

                <Section title="Our Mission">
                    To make learning fun, accessible, and rewarding through the power of interactive quizzes and
                    community-driven knowledge.
                </Section>

            </View>

            {/* Team Section */}
            {aboutUsData && aboutUsData?.data?.length > 0 && (
                <>
                    <Text className="text-violet-400 text-2xl font-semibold mb-5 text-center">
                        Our Team
                    </Text>

                    <View className="flex-col sm:flex-row justify-center gap-4">
                        {aboutUsData.data.map((member, index) => (
                            <Pressable
                                key={index}
                                className="bg-[#161b22] flex-1 my-2 rounded-2xl px-5 py-7 items-center shadow-md shadow-black/40 hover:scale-[1.02] transition-all"
                            >
                                {member.photoUrl ? (
                                    <Image
                                        source={{ uri: member.photoUrl }}
                                        className="w-32 h-32 rounded-full border-2 border-violet-400"
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View className="w-32 h-32 rounded-full bg-blue-900 items-center justify-center border-2 border-violet-400">
                                        <Text className="text-violet-400 text-xl font-bold">
                                            {member.fullName.charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                )}
                                <Text className="text-violet-400 text-xl font-bold mt-3">
                                    {member.fullName}
                                </Text>
                                <Text className="text-gray-300 text-md mt-1">{member.position}</Text>
                                <Text className="text-gray-400 text-sm">{member.faculty}</Text>

                                {/* Social Buttons */}
                                <View className="flex-row mt-4 space-x-2">
                                    {member.githubLink && (
                                        <TouchableOpacity
                                            onPress={() => handleLinkPress(member.githubLink)}
                                            className="bg-gray-800 px-3 py-1 rounded-lg border border-gray-600"
                                        >
                                            <Text className="text-gray-300 text-xs font-medium">GitHub</Text>
                                        </TouchableOpacity>
                                    )}
                                    {member.linkedinLink && (
                                        <TouchableOpacity
                                            onPress={() => handleLinkPress(member.linkedinLink)}
                                            className="bg-blue-900 px-3 py-1 rounded-lg border border-blue-700"
                                        >
                                            <Text className="text-blue-300 text-xs font-medium">LinkedIn</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View className="mb-6 flex-1">
            <Text className="text-violet-400 text-xl font-semibold mb-2">{title}</Text>
            <Text className="text-gray-300 text-sm leading-5">{children}</Text>
        </View>
    );
}

