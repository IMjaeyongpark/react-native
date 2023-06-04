import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = (props) => {
  const likeddata = {};

  for (a of props.liked) {
    likeddata[a] = { selected: true };
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Calendar onDayPress={props.handleDayPress} markedDates={likeddata} />
    </View>
  );
};

export default MyCalendar;
