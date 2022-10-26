import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import MatrixMarketplace from './app.json';
import App from "./App";

export default function Index() {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(MatrixMarketplace.expo.name, () => Index);