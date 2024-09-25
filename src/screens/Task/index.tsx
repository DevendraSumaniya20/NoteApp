import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {
  CustomButton,
  CustomHeader,
  CustomMargin,
  CustomNormalTextInput,
  CustomText,
  GradientComponent,
} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';
import Toast from 'react-native-toast-message';

interface TaskScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Tasks'>;
}

const Task: React.FC<TaskScreenProps> = ({navigation}) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Format date as string
  const formatDate = (date: Date | null) => {
    return date ? date.toDateString() : '';
  };

  // Handle start date change
  const onStartDateChange = (date: Date) => {
    setStartDate(date);
    setShowStartPicker(false);
  };

  // Handle end date change
  const onEndDateChange = (date: Date) => {
    setEndDate(date);
    setShowEndPicker(false);
  };

  // Reset the form fields
  const resetForm = () => {
    setTaskName('');
    setDescription('');
    setStartDate(null);
    setEndDate(null);
  };

  // Validate input fields
  const validateTask = () => {
    if (!taskName) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter the task name.',
      });
      return false;
    }
    if (!startDate) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Start date is required.',
      });
      return false;
    }
    if (!endDate) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'End date is required.',
      });
      return false;
    }
    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Task description is required.',
      });
      return false;
    }
    return true;
  };

  // Create task logic
  const createTask = () => {
    if (validateTask()) {
      console.log('Task Name:', taskName);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      console.log('Description:', description);

      Alert.alert('Task Created', 'Your task has been successfully created.');
      resetForm(); // Clear the form after task creation
    }
  };

  return (
    <GradientComponent>
      <CustomMargin>
        <View style={styles.header}>
          <CustomHeader
            IconColor={colors.white}
            IconName="x"
            iconType="Feather"
            onPress={() => navigation.navigate('Home')}
            size={moderateScale(26)}
          />
          <CustomText text="Create a Task" textStyle={styles.headerText} />
        </View>

        {/* Input fields */}
        <View style={styles.inputContainer}>
          <CustomNormalTextInput
            label="Task Name"
            value={taskName}
            onChangeText={setTaskName}
          />

          {/* Start Date Input */}
          <CustomNormalTextInput
            label="Start Date"
            rightIcon="calendar-number-outline"
            rightIconType="Ionicons"
            value={formatDate(startDate)}
            editable={false} // Prevent manual input
            onPressRight={() => setShowStartPicker(true)}
          />

          {/* End Date Input */}
          <CustomNormalTextInput
            label="End Date"
            rightIcon="calendar-number-outline"
            rightIconType="Ionicons"
            value={formatDate(endDate)}
            editable={false}
            onPressRight={() => setShowEndPicker(true)}
          />

          <CustomNormalTextInput
            label="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Create Task Button */}
        <View style={styles.buttonContainer}>
          <CustomButton onPress={createTask} title="Create Task" />
        </View>
      </CustomMargin>

      {/* Start Date Picker Modal */}
      <Modal visible={showStartPicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <CalendarPicker
            onDateChange={onStartDateChange}
            selectedStartDate={startDate || undefined}
            todayBackgroundColor={colors.neonYellow}
            selectedDayColor={colors.hotPink}
            selectedDayTextColor={colors.white}
            previousTitleStyle={styles.calendarTitleStyle}
            nextTitleStyle={styles.calendarTitleStyle}
            selectedDayTextStyle={styles.selectedDayTextStyle}
            todayTextStyle={styles.todayTextStyle}
            textStyle={styles.calendarTextStyle}
            scrollable
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowStartPicker(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* End Date Picker Modal */}
      <Modal visible={showEndPicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <CalendarPicker
            onDateChange={onEndDateChange}
            selectedStartDate={endDate || undefined}
            todayBackgroundColor={colors.neonCyan}
            selectedDayColor={colors.neonRed}
            selectedDayTextColor={colors.white}
            previousTitleStyle={styles.calendarTitleStyle}
            nextTitleStyle={styles.calendarTitleStyle}
            selectedDayTextStyle={styles.selectedDayTextStyle}
            todayTextStyle={styles.todayTextStyle}
            textStyle={styles.calendarTextStyle}
            scrollable
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowEndPicker(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </GradientComponent>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? moderateScale(40) : moderateScale(26),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
  },
  headerText: {
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: colors.white,
  },
  inputContainer: {
    marginVertical: moderateHeight(4),
  },
  buttonContainer: {
    marginVertical: moderateHeight(8),
  },
  modalContainer: {
    flex: 1,
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lavender_60,
  },
  closeButton: {
    marginTop: moderateScale(20),
    backgroundColor: colors.neonRed,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateHeight(2),
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarTitleStyle: {
    color: colors.neonBlue,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  selectedDayTextStyle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  todayTextStyle: {
    color: colors.neonYellow,
    fontWeight: 'bold',
  },
  calendarTextStyle: {
    color: colors.neonRed_60,
    fontWeight: 'bold',
  },
});
