import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screen/mainScreen';
import FinalFoodList from './screen/FinalFoodList';

const Stack = createStackNavigator();

function MainStack() {
    return (
        <Stack.Navigator initialRouteName="MainScreen">
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }} 
            />
            <Stack.Screen
                name="FinalFoodList"
                component={FinalFoodList}
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default MainStack;
