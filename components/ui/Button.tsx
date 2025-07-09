import React from "react";

import { TouchableOpacity, Text, View, ActivityIndicator, Pressable } from "react-native";

import * as Haptics from "expo-haptics";
import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/context/ThemeContext";

type ITheme = "light" | "dark";

const buttonVariants = cva(
    "flex-row items-center justify-center gap-2 px-4 py-2 font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                solid: "",
                outline: "bg-transparent border",
                ghost: "bg-transparent border-transparent",
                link: "bg-transparent underline border-transparent",
            },
            color: {
                primary: "",
                success: "",
                danger: "",
                warning: "",
                gray: "",
            },
            size: {
                sm: "text-sm py-1 px-3",
                md: "text-base py-2 px-4",
                lg: "text-lg py-3 px-6",
            },
            radius: {
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                full: "rounded-full",
            },
        },
        compoundVariants: [
            // Solid Buttons (bg + text + border)
            {
                variant: "solid",
                color: "primary",
                class:
                    "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-400",
            },
            {
                variant: "solid",
                color: "success",
                class:
                    "bg-green-600 text-white border-green-600 dark:bg-green-500 dark:border-green-500 dark:text-white hover:bg-green-500 dark:hover:bg-green-400",
            },
            {
                variant: "solid",
                color: "danger",
                class:
                    "bg-red-600 text-white border-red-600 dark:bg-red-500 dark:border-red-500 dark:text-white hover:bg-red-500 dark:hover:bg-red-400",
            },
            {
                variant: "solid",
                color: "warning",
                class:
                    "bg-amber-500 text-white border-amber-500 dark:bg-amber-400 dark:border-amber-400 dark:text-white hover:bg-amber-400 dark:hover:bg-amber-300",
            },
            {
                variant: "solid",
                color: "gray",
                class:
                    "bg-gray-600 text-white border-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-600",
            },

            // Outline Buttons (transparent bg, colored border + text)
            {
                variant: "outline",
                color: "primary",
                class:
                    "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-200",
            },
            {
                variant: "outline",
                color: "success",
                class:
                    "border-green-600 text-green-600 dark:border-green-500 dark:text-white hover:bg-green-100 dark:hover:bg-green-200",
            },
            {
                variant: "outline",
                color: "danger",
                class:
                    "border-red-600 text-red-600 dark:border-red-500 dark:text-white hover:bg-red-100 dark:hover:bg-red-200",
            },
            {
                variant: "outline",
                color: "warning",
                class:
                    "border-amber-500 text-amber-700 dark:border-amber-400 dark:text-white hover:bg-amber-100 dark:hover:bg-amber-300",
            },
            {
                variant: "outline",
                color: "gray",
                class:
                    "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-200",
            },

            // Ghost Buttons (transparent bg + no border + colored text)
            {
                variant: "ghost",
                color: "primary",
                class:
                    "text-blue-600 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-200",
            },
            {
                variant: "ghost",
                color: "success",
                class:
                    "text-green-600 dark:text-white hover:bg-green-100 dark:hover:bg-green-200",
            },
            {
                variant: "ghost",
                color: "danger",
                class:
                    "text-red-600 dark:text-white hover:bg-red-100 dark:hover:bg-red-200",
            },
            {
                variant: "ghost",
                color: "warning",
                class:
                    "text-amber-700 dark:text-white hover:bg-amber-100 dark:hover:bg-amber-300",
            },
            {
                variant: "ghost",
                color: "gray",
                class:
                    "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-200",
            },

            // Link Buttons (transparent bg + underlined text)
            {
                variant: "link",
                color: "primary",
                class: "text-blue-600 dark:text-white",
            },
            {
                variant: "link",
                color: "success",
                class: "text-green-600 dark:text-white",
            },
            {
                variant: "link",
                color: "danger",
                class: "text-red-600 dark:text-white",
            },
            {
                variant: "link",
                color: "warning",
                class: "text-amber-700 dark:text-white",
            },
            {
                variant: "link",
                color: "gray",
                class: "text-gray-700 dark:text-white",
            },
        ],
        defaultVariants: {
            variant: "solid",
            color: "primary",
            size: "md",
            radius: "md",
        },
    }
);

const commonColors = {
    primary: "text-blue-600 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-600",
    success: "text-green-600 dark:text-success-300 group-hover:text-green-600 dark:group-hover:text-green-600",
    danger: "text-red-600 dark:text-danger-300 group-hover:text-red-600 dark:group-hover:text-red-600",
    warning: "text-amber-700 dark:text-warning-300 group-hover:text-amber-600 dark:group-hover:text-amber-600",
    gray: "text-gray-700 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-600",
}

const textColorVariants = {
    solid: {
        primary: "text-white dark:text-white",
        success: "text-white dark:text-white",
        danger: "text-white dark:text-white",
        warning: "text-white dark:text-white",
        gray: "text-white dark:text-white",
    },
    outline: { ...commonColors },
    ghost: { ...commonColors },
    link: { ...commonColors },
};

function getRippleColor(variant: VariantProps<typeof buttonVariants>["variant"], color: VariantProps<typeof buttonVariants>["color"], theme: ITheme): string {
    const light = {
        primary: "#bfdbfe",
        success: "#bbf7d0",
        danger: "#fecaca",
        warning: "#fde68a",
        gray: "#e5e7eb",
    };
    const dark = {
        primary: "#1e3a8a",
        success: "#14532d",
        danger: "#7f1d1d",
        warning: "#78350f",
        gray: "#374151",
    };

    const base = theme === "dark" ? dark : light;

    return base[color as keyof typeof base] || base.gray;
}

function getRadius(radius: VariantProps<typeof buttonVariants>["radius"]): number {
    switch (radius) {
        case "sm":
            return 4;
        case "md":
            return 6;
        case "lg":
            return 8;
        case "full":
            return 9999;
        default:
            return 6;
    }
}


export interface ButtonProps
    extends React.ComponentProps<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
    title?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    color?: VariantProps<typeof buttonVariants>["color"];
    size?: VariantProps<typeof buttonVariants>["size"];
    radius?: VariantProps<typeof buttonVariants>["radius"];
}

export function Button({
    title,
    isLoading,
    disabled,
    leftIcon,
    rightIcon,
    className,
    variant = "solid",
    color = "primary",
    size,
    radius,
    children,
    fullWidth = false,
    ...props
}: ButtonProps) {

    const { theme } = useTheme();
    const btnClass = twMerge(
        clsx("group", buttonVariants({ variant, color, size, radius }), className)
    );
    const isDisabled = disabled || isLoading;
    const rippleColor = getRippleColor(variant || 'solid', color || 'primary', theme || 'light');

    const handlePress = async (e: any) => {
        if (!isDisabled) {
            await Haptics.selectionAsync(); // feedback
            props.onPress?.(e); // Call original
        }
    };

    return (
        <View style={{
            borderRadius: getRadius(radius || 'md'),
            overflow: 'hidden',
            ...(fullWidth ? { flex: 1 } : {})
        }}>
            <Pressable
                className={btnClass}
                disabled={isDisabled}
                onPress={handlePress}
                android_ripple={{ color: rippleColor }}
                style={({ pressed }) => [
                    {
                        opacity: isDisabled ? 0.5 : 1,
                    },
                    ...(pressed ? [{ backgroundColor: rippleColor }] : []),
                ]}
                {...props}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <>
                        {leftIcon && <View>{leftIcon}</View>}
                        <Text
                            className={clsx(
                                "font-medium transition-colors text-center",
                                variant && color
                                    ? textColorVariants[variant as keyof typeof textColorVariants]?.[
                                    color as keyof typeof textColorVariants[typeof variant]
                                    ]
                                    : undefined
                            )}
                        >
                            {title}
                        </Text>
                        {rightIcon && <View>{rightIcon}</View>}
                    </>
                )}
            </Pressable>
        </View >
    );
};

export function AllButtons() {
    return (
        <View className="space-y-6" >
            <Text className="text-xl text-gray-800 dark:text-white">All buttons </Text>
            {
                ['primary', 'success', 'danger', 'warning', 'gray'].map((color) => (
                    <View key={color} className="space-y-2">
                        <Text className="text-lg font-semibold text-gray-800 capitalize dark:text-white">{color}</Text>
                        <View className="flex-row flex-wrap gap-2">
                            <Button title="Solid" color={color as any} variant="solid" />
                            <Button title="Outline" color={color as any} variant="outline" />
                            <Button title="Ghost" color={color as any} variant="ghost" />
                            <Button title="Link" color={color as any} variant="link" />
                        </View>
                    </View>
                ))
            }
        </View>
    )
}
