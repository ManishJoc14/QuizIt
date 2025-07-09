import React from 'react';
import { Button } from '@/components/ui/Button';

interface Props {
    onPress: () => void;
}

export function JoinButton({ onPress }: Props) {
    return (
        <Button
            title="Join"
            size="lg"
            className="rounded-full py-4"
            onPress={onPress}
        />
    );
}
