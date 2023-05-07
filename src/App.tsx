import { StoreProvider } from "easy-peasy";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { store } from "./Stores";

function App() {
    return (
        <BrowserRouter>
            <StoreProvider store={store}>
                <RootLayout />
            </StoreProvider>
        </BrowserRouter>
    );
}

export default App;
