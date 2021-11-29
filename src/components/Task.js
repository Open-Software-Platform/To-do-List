import React,{useState} from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { theme } from "../theme";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import { Image } from "react-native";
import { images } from "../image";
import Input from "./Input";

const Task = ({item, deleteTask, toggleTask, updateTask, select}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text);
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }
    const _onSubmitEditing = () => {
        if (isEditing) {
            const editedTask = Object.assign({}, item, {text});
            setIsEditing(false);
            updateTask(editedTask);
        }
    }

    const _onBlur = () => {
        if (isEditing) {
            setIsEditing(false);
            setText(item.text);
        }
    }

    const _handleUpdateSelect = () => {
        SetIsSelected((prev) => !prev)
    }

    // select
    const [isSelected, SetIsSelected] = useState(false);

    return isEditing ?(
        <Input value={text} onChangeText={text=>setText(text)} onSubmitEditing={_onSubmitEditing} onBlur={_onBlur}/>
        ):(
        <Pressable onPressOut={_handleUpdateSelect} style={[taskStyles.container, {backgroundColor: (select && isSelected) ? theme.main : theme.itemBackground}]}>
            {select ||
                <>
                <Pressable><Image source={images.drag} style={{tintColor: theme.text, width: 30, height: 30}}></Image></Pressable> 
                <IconButton type={item.completed ? images.completed : images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
                </>
            }
            <Text style={[taskStyles.contents, 
                {color: (item.completed ? theme.done : theme.text)},
                {textDecorationLine: (item.completed? 'line-through': 'none')}]}>
                {item.text}</Text>
            <Text style={{fontSize: 15, color: theme.text, marginRight:5,}}>11/26</Text>
            {select ||
                <>
                {item.completed || (<IconButton type={images.update} onPressOut={_handleUpdateButtonPress}/>)}
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} completed={item.completed}/>
                </>
            }
        </Pressable>
    );
};

const taskStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        height:60,
        //backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 5,
        marginTop: 3,
        marginLeft: 0,
    },

    contents: {
        flex: 1,
        fontSize: 24,
        color: theme.text,
        marginLeft: 5,
    }
});

Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
};

export default Task;