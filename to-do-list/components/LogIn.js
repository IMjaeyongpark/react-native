import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

const Login = (props) => {
  const [myTextInput, setmyTextInput] = useState('');

  const onChageInput = (event) => {
    setmyTextInput(event);
  };

  return (
    <View style={{ flexDirection: 'row', height: 30 }}>
      <TextInput
        style={{
          background: 'white',
          width: '90%',
          height: 30,
          fontSize: 18,
        }}
        value={myTextInput}
        onChangeText={onChageInput}
        editable={true}></TextInput>
      <TouchableOpacity onPress={() => {props.navigation.navigate("TODOLIST",{ id: myTextInput })}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            background: 'skyblue',
            height: '100%',
            width: 30,
          }}>
          go
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
