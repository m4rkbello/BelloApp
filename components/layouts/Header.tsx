import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = ({ title, onBackPress, rightComponent, backgroundColor = '#FFFFFF' }) => {
  return (
    <Appbar.Header style={[styles.header, { backgroundColor }]}>
      {onBackPress && (
        <Appbar.BackAction onPress={onBackPress} />
      )}
      <Appbar.Content title={title} titleStyle={styles.title} />
      {rightComponent && (
        <View style={styles.rightComponent}>
          {rightComponent}
        </View>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  rightComponent: {
    marginRight: 8,
  },
});

export default Header;