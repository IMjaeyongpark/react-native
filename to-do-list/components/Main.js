import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MyCalendar from './MyCalendar';
import { db } from '../firebaseConfig';

const Main = (props) => {

  const params = props.route.params;
  const id = params ? params.id : null;

  useEffect(() => {
    readfromDB();
  }, []);
  
  //입력창의 텍스트
  const [myTextInput, setmyTextInput] = useState('');

  //즐겨찾기 데이터
  const [liked, setLiked] = useState([]);

  //현재 시간 가져오기
  const now = new Date();
  let now_month = now.getMonth() + 1;
  let now_Date = now.getDate();

  //데이터 전처리
  if (now_month < 10) {
    now_month = `0${now_month}`;
  }
  if (now_Date < 10) {
    now_Date = `0${now_Date}`;
  }
  const current_date = `${now.getFullYear()}-${now_month}-${now_Date}`;

  //선택된 날짜
  const [selectedDate, setSelectedDate] = useState(String(current_date));
  //데이터
  const [dateList, setDateList] = useState({ [selectedDate]: [] });

  //즐겨찾기 버튼
  const likedbnt = () => {
    if (liked.includes(selectedDate)) {
      setLiked(
        liked.filter((item, idx) => {
          return liked[idx] != selectedDate;
        })
      );
    } else {
      setLiked([...liked, selectedDate]);
    }
  };

  //캘린더의 날짜를 눌렀을때 날짜 변경
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  //입력창에 입력시 반영
  const onChageInput = (event) => {
    setmyTextInput(event);
  };

  //+버튼을 눌렀을때 데이터 추가
  const onPressBtn = () => {
    const new_data = {
      ...dateList,
    };
    new_data[selectedDate].push(myTextInput);
    setDateList(new_data);
    setmyTextInput('');
    addtoDB()
  };

  //데이터에 새로운 날짜가 들어오면 초기화하여 추가
  const newdate = () => {
    const new_data = {
      ...dateList,
      [selectedDate]: [],
    };
    setDateList(new_data);
  };

  //데이터 삭제
  const deletedata = (idx) => {
    const new_data = {
      ...dateList,
    };
    new_data[selectedDate] = new_data[selectedDate].filter((item, index) => {
      return idx != index;
    });
    setDateList(new_data);
    addtoDB()
  };

  //insert
  const addtoDB = async () => {
    try {
      db.collection('user').doc(id).set({
        data: { dateList },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //read
  const readfromDB = async () => {
    try {
      const data = await db.collection('user').doc(id);
      data.get().then((snap) => {
        setDateList(snap.data().data.dateList);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <MyCalendar handleDayPress={handleDayPress} liked={liked} />
      <TouchableOpacity onPress={likedbnt}>
        <Text style={styles.dateStyle}>{selectedDate}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', height: 30 }}>
        <TextInput
          style={styles.todotext}
          value={myTextInput}
          onChangeText={onChageInput}
          editable={true}></TextInput>
        <TouchableOpacity onPress={onPressBtn}>
          <Text style={styles.bnttext}>+</Text>
        </TouchableOpacity>
      </View>

      {dateList[selectedDate]
        ? dateList[selectedDate].map((item, idx) => {
            return (
              <View style={{ flexDirection: 'row', height: 30 }}>
                <Text style={styles.todotext}>{item}</Text>
                <TouchableOpacity onPress={() => deletedata(idx)}>
                  <Text style={styles.bnttext}>-</Text>
                </TouchableOpacity>
              </View>
            );
          })
        : newdate()}
    </View>
  );
};

const styles = StyleSheet.create({
  dateStyle: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  todotext: {
    background: 'white',
    width: '90%',
    height: 30,
    fontSize: 18,
  },
  bnttext: {
    fontSize: 20,
    textAlign: 'center',
    background: 'skyblue',
    height: '100%',
    width: 30,
  },
});

export default Main;
