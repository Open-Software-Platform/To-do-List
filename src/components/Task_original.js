import React,{useState, useEffect} from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { theme } from "../theme";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import { Image } from "react-native";
import { images } from "../image";
import { ThemeProvider } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
/*import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";*/


const Task = ({item, deleteTask, toggleTask, updateTask, select, calendarMode, navigation}) => {
    
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

    //let today = (new Date()).format('YYYY / MM / DD'); // 현재 날짜 및 시간
    //const [todayDate, setTodayDate] = useState(today.format('YYYY / MM / DD'));
    let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
    let time = {
      year: today.getFullYear(),  //현재 년
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현재 날짜
    };
    let timestring = ""+time.year+time.month+time.date;

    // select
    const [isSelected, SetIsSelected] = useState(false);

    const [themeMode, setThemeMode] = useState(lightTheme);
    const _loadTheme = async () => {
        const loadedThemeMode = await AsyncStorage.getItem('themeMode');
        setThemeMode(JSON.parse(loadedThemeMode));
    }

    useEffect(()=>{
        _loadTheme();
    },[])

    return (
        <ThemeProvider>
            <Pressable onPressOut={() => select ? _handleUpdateSelect : navigation.navigate('Show', {item: item})} 
                style={[taskStyles.container, {backgroundColor: (select && isSelected) ? themeMode.main : themeMode.itemBackground}]}>
            {select ||
                (calendarMode === false) ? (
                <>
                <View style={{flexDirection:'column'}}>
                    <Pressable><Image source={images.up} style={{tintColor: themeMode.text, width: 30, height: 30}}></Image></Pressable> 
                    <Pressable><Image source={images.down} style={{tintColor: themeMode.text, width: 30, height: 30}}></Image></Pressable>
                </View>
                <IconButton type={item.completed ? images.completed : images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
                </>
            ) : (
                <>
                <IconButton type={item.completed ? images.completed : images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
                </>
            )
            }
                {calendarMode === "false" ? (
                    <View>
                        <Text style={[taskStyles.contents, 
                            {color: (item.completed ? themeMode.done : themeMode.text)},
                            {textDecorationLine: (item.completed? 'line-through': 'none')}]}>
                            {item.title}
                        </Text>
                        {( timestring == item.date ) ? (
                            <Text style={{fontSize: 15, fontWeight: '600', color: 'red', marginRight:5,}}>D-day</Text>
                           ) : (
                            <Text style={{fontSize: 15, color: themeMode.text, marginRight:5,}}>{item.date.substring(0,4)+" / "+item.date.substring(4,6)+" / "+item.date.substring(6,8)}</Text>
                            )}
                        <Text style={{fontSize: 15, color: themeMode.text, marginRight:5,}}>{item.category}</Text>
                        <Text style={{fontSize: 15, color: themeMode.text, marginRight:5,}}>{item.comment}</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={[taskStyles.contents, 
                            {color: (item.completed ? themeMode.done : themeMode.text)},
                            {textDecorationLine: (item.completed? 'line-through': 'none')}]}>
                            {item.title}</Text>
                            {( timestring == item.date ) ? (
                                <Text style={{fontSize: 15, color: 'red', marginRight:5,}}>D-day</Text>
                            ) : (
                                <Text style={{fontSize: 15, color: themeMode.text, marginRight:5,}}>{item.date.substring(0,4)+" / "+item.date.substring(4,6)+" / "+item.date.substring(6,8)}</Text>
                            )}
                    </View>
                )
                }
            <View style={{position:'absolute', right:0,flexDirection:'row'}} calendarMode={calendarMode}>
                {calendarMode === "false" ? 
                    select ||
                        <>
                        {item.completed || (<IconButton type={images.update} onPressOut={_handleUpdateButtonPress
                        , () => select ? _handleUpdateSelect : navigation.navigate('Edit', {item: item})} />)}
                    <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} completed={item.completed}/>
                        </>
                 : 
                    <></>}
            </View>
        </Pressable>
        </ThemeProvider>
        
    );
};

const taskStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        //height:60,
        //backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 5,
        marginTop: 3,
        marginLeft: 0,
    },

    contents: {
        flex: 1,
        fontSize: 24,
        //color: theme.text,
        marginLeft: 5,
    }
});

Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func,
    toggleTask: PropTypes.func,
};

export default Task;