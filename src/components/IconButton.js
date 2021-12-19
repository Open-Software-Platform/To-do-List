import React, {useState, useEffect} from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";
import PropTypes from 'prop-types';
import { images } from "../image";
import { ThemeProvider } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";


const IconButton = ({type, onPressOut, id}) => {

    const _onPressOut = () => {
        onPressOut(id);
    }

    return(
        <Pressable onPressOut={_onPressOut}>
            <Image source={type} style={iconStyles.icon}/>
        </Pressable>
    );
};

IconButton.defaultProps = {
    onPressOut: () => {},
}

const iconStyles = StyleSheet.create({
    icon: {
        tintColor: '#1185b4',
        width: 25,
        height: 25,
        margin: 10,
        padding: 0,
        marginHorizontal: 3,
    },
});

IconButton.propTypes ={
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
    id: PropTypes.string,
};

export default IconButton;