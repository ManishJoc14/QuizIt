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
            radius="full"
            className="py-4"
            onPress={onPress}
        />
    );
}
