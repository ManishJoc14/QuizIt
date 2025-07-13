import React, { useState, useRef } from 'react';
import { View, Text, Pressable, LayoutChangeEvent, Animated, Easing } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

interface AccordionProps {
    title: string | React.ReactNode; // Can be a string or a custom React Node
    children: React.ReactNode;
    // Optional: Allow custom icon names for expanded/collapsed states
    expandedIconName?: IconSymbolName;
    collapsedIconName?: IconSymbolName;
    // Optional: Allow custom icon size and color
    iconSize?: number;
    iconColor?: string;
    // Optional: Allow custom animation duration
    animationDuration?: number;
    // Optional: Custom title styling
    titleClassName?: string;
    // Optional: Custom body styling
    bodyClassName?: string;
}

export function Accordion({
    title,
    children,
    expandedIconName = 'chevron.up',
    collapsedIconName = 'chevron.down',
    iconSize = 20,
    iconColor = '#4B5563',
    animationDuration = 300,
    titleClassName = "text-lg font-semibold text-gray-900 dark:text-white leading-6",
    bodyClassName = "mt-3",
}: AccordionProps) {


    // State to control the expanded/collapsed visual state.
    const [open, setOpen] = useState(false);

    // useRef to hold the Animated.Value controller for animations.
    // This value will interpolate between 0 and 1 to control height and rotation.
    const animatedController = useRef(new Animated.Value(0)).current;

    // State to store the measured height of the collapsible content.
    const [bodySectionHeight, setBodySectionHeight] = useState(0);

    // Interpolate the height based on the animatedController's value.
    // When animatedController is 0, height is 0. When 1, height is bodySectionHeight.
    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
    });

    // Interpolate the arrow rotation angle.
    // When animatedController is 0, angle is 0rad. When 1, angle is PI rad (180 degrees).
    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0rad', `${Math.PI}rad`],
    });

    // Interpolate the opacity for the content inside the accordion.
    // This helps with a smoother fade-in/fade-out effect.
    const contentOpacity = animatedController.interpolate({
        inputRange: [0, 0.5, 1], // Fade in during the first half of expansion
        outputRange: [0, 0, 1],
        extrapolate: 'clamp', // Ensure opacity stays within 0-1
    });

    // Function to toggle the expanded state and trigger the animation.
    const toggleAccordion = () => {
        if (open) {
            // If currently open, animate to collapsed state (toValue: 0).
            Animated.timing(animatedController, {
                duration: animationDuration,
                toValue: 0,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Standard material design easing
                useNativeDriver: false, // Height animation typically requires useNativeDriver: false
            }).start();
        } else {
            // If currently closed, animate to expanded state (toValue: 1).
            Animated.timing(animatedController, {
                duration: animationDuration,
                toValue: 1,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Standard material design easing
                useNativeDriver: false, // Height animation typically requires useNativeDriver: false
            }).start();
        }
        setOpen(!open); // Toggle the React state for visual consistency
    };

    // Callback function for the onLayout event.
    // This is crucial for accurately measuring the content's full height.
    const handleLayout = (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height;
        // Only set the bodySectionHeight if it hasn't been set yet or if it changes (dynamic content).
        // This ensures we capture the true height.
        if (bodySectionHeight === 0 || bodySectionHeight !== height) {
            setBodySectionHeight(height);
            // If the accordion is already open (e.g., after initial render and measurement),
            // set the animatedController to 1 to show content immediately without animation.
            // This prevents a 'flash' if the component starts in an expanded state.
            if (open) {
                animatedController.setValue(1);
            }
        }
    };

    return (
        <View>
            {/* Header section, which acts as the toggle button for expansion/collapse */}
            <Pressable onPress={toggleAccordion} className="flex-row justify-between items-start pt-1">
                <View className="flex-1 pr-2">
                    {typeof title === 'string' ? (
                        <Text className={titleClassName}>
                            {title}
                        </Text>
                    ) : (
                        title // Render custom React Node if title is not a string
                    )}
                </View>
                {/* Animated icon rotation based on `arrowAngle` */}
                <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                    <IconSymbol
                        name={open ? expandedIconName : collapsedIconName} // Icon changes based on `open` state
                        size={iconSize}
                        color={iconColor}
                    />
                </Animated.View>
            </Pressable>

            {/* The Animated.View for the collapsible body.
          Its height is controlled by `bodyHeight` interpolation.
          `overflow: 'hidden'` is crucial to clip content during collapse.
          `className` prop allows external styling.
      */}
            <Animated.View style={[{ height: bodyHeight, overflow: 'hidden' }]} className={bodyClassName}>
                {/*
          This inner View is crucial for accurate measurement.
          By setting `position: 'absolute'` and `width: '100%'`, it allows its
          `onLayout` to report the true, unconstrained height of its children.
          This measured height is then used for the animation.
          `bottom: 0` is added to align content to the bottom of the measuring view.
        */}
                <View
                    onLayout={handleLayout}
                    style={{ position: 'absolute', width: '100%', bottom: 0 }}
                >
                    {/* The actual content that needs to be animated.
              Apply the content-specific opacity animation here.
          */}
                    <Animated.View style={{ opacity: contentOpacity }} className="w-full">
                        {children}
                    </Animated.View>
                </View>
            </Animated.View>
        </View>
    );
}
