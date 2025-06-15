import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const Container = ({ children, style, statusBarStyle = 'dark-content', backgroundColor = '#F8FAFC' }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor }, style]}>
                <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Container;