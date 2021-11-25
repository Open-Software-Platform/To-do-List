import React from "react";
import TabNavigation from "./navigations/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Calendario } from "./screens/Calendario";
import { Calendar } from "react-native-calendario";

export default function App() {
    return (
        <Calendar
        onChange={(range) => console.log(range)}
        minDate={new Date(2018, 3, 20)}
        startDate={new Date(2018, 3, 30)}
        endDate={new Date(2018, 4, 5)}
        // hideArrows={false}
        renderArrow={(direction) => direction === "left" ? (
          <AntDesign name="left" size={20} color="#50cebb" />
            ) : (
          <AntDesign name="right" size={20} color="#50cebb" />
            )
        }
        theme={{
          activeDayColor: {},
          monthTitleTextStyle: {
            color: '#6d95da',
            fontWeight: '300',
            fontSize: 16,
          },
          emptyMonthContainerStyle: {},
          emptyMonthTextStyle: {
            fontWeight: '200',
          },
          weekColumnsContainerStyle: {},
          weekColumnStyle: {
            paddingVertical: 10,
          },
          weekColumnTextStyle: {
            color: '#b6c1cd',
            fontSize: 13,
          },
          nonTouchableDayContainerStyle: {},
          nonTouchableDayTextStyle: {},
          startDateContainerStyle: {},
          endDateContainerStyle: {},
          dayContainerStyle: {},
          dayTextStyle: {
            color: '#2d4150',
            fontWeight: '200',
            fontSize: 15,
          },
          dayOutOfRangeContainerStyle: {},
          dayOutOfRangeTextStyle: {},
          todayContainerStyle: {},
          todayTextStyle: {
            color: '#6d95da',
          },
          activeDayContainerStyle: {
            backgroundColor: '#6d95da',
          },
          activeDayTextStyle: {
            color: 'white',
          },
          nonTouchableLastMonthDayTextStyle: {},
        }}
      />
      
    );
};