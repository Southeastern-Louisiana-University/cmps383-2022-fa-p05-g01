import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import App from './App';

const Navbar = () => (
    <Appbar.Header style={styles.top}>
        <Appbar.Action icon="apps" onPress={() => {}} />
        <Appbar.Content title="Matrix" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="account-circle" onPress={() => {}} />
    </Appbar.Header>
 );

export default Navbar

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    justifyContent: 'space-between'
  },
});