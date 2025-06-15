import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GoogleSignInButton = ({ onPress, loading = false, disabled = false }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                (disabled || loading) && styles.disabled,
            ]}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="small" color="#6B7280" style={styles.icon} />
                ) : (
                    <Icon name="google" size={20} color="#4285F4" style={styles.icon} />
                )}
                <Text variant="bodyLarge" style={styles.text}>
                    {loading ? 'Signing in...' : 'Continue with Google'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    disabled: {
        opacity: 0.6,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 12,
    },
    text: {
        color: '#374151',
        fontWeight: '600',
    },
});

export default GoogleSignInButton;