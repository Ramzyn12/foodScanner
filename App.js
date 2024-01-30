// App.js
import 'react-native-gesture-handler';
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainComponent from "./MainComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <MainComponent />
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
