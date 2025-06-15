import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CustomButton = ({
    title,
    onPress,
    mode = 'contained',
    loading = false,
    disabled = false,
    icon,
    style,
    contentStyle,
    labelStyle,
    buttonColor = '#6366F1',
    textColor = '#FFFFFF',
    ...props
}) => {
    return (
        <Button
            mode={mode}
            onPress={onPress}
            loading={loading}
            disabled={disabled || loading}
            icon={icon}
            buttonColor={mode === 'contained' ? buttonColor : 'transparent'}
            textColor={mode === 'contained' ? textColor : buttonColor}
            style={[
                styles.button,
                mode === 'outlined' && styles.outlinedButton,
                style,
            ]}
            contentStyle={[styles.content, contentStyle]}
            labelStyle={[styles.label, labelStyle]}
            theme={{
                colors: {
                    primary: buttonColor,
                    outline: buttonColor,
                },
            }}
            {...props}
        >
            {title}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        marginVertical: 4,
    },
    outlinedButton: {
        borderWidth: 1,
    },
    content: {
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default CustomButton;