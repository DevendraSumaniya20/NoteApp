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
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {addNoteAsync} from '../../redux/slices/noteSlice';

interface NoteScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Notes'>;
}

const Notes: React.FC<NoteScreenProps> = ({navigation}) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [status, setStatus] = useState('Pending');

  const dispatch = useAppDispatch();

  const formatDate = (date: Date | null) => {
    return date ? date.toDateString() : '';
  };

  const onStartDateChange = (date: Date) => {
    setStartDate(date);
    setShowStartPicker(false);
  };

  const onEndDateChange = (date: Date) => {
    setEndDate(date);
    setShowEndPicker(false);
  };

  const resetForm = () => {
    setNoteTitle('');
    setNoteDescription('');
    setStartDate(null);
    setEndDate(null);
    setStatus('Pending');
  };

  const validateNote = () => {
    if (!noteTitle) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter the note title.',
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
    if (endDate && startDate && endDate < startDate) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'End date must be after the start date.',
      });
      return false;
    }
    if (!noteDescription) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Note description is required.',
      });
      return false;
    }
    return true;
  };

  const createNote = async () => {
    if (validateNote()) {
      try {
        const formattedStartDate = startDate?.toISOString() || null;
        const formattedEndDate = endDate?.toISOString() || null;

        const response = await dispatch(
          addNoteAsync({
            title: noteTitle,
            description: noteDescription,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            status: status,
          }),
        );

        if (response.meta.requestStatus === 'fulfilled') {
          Alert.alert(
            'Note Created',
            'Your note has been successfully created.',
          );
          resetForm();
        } else {
          Alert.alert('Error', 'Failed to create note. Please try again.');
        }
      } catch (error) {
        console.error('Error creating note:', error);
        Alert.alert('Error', 'An error occurred while creating the note.');
      }
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
          <CustomText text="Create a Note" textStyle={styles.headerText} />
        </View>

        <View style={styles.inputContainer}>
          <CustomNormalTextInput
            label="Note Title"
            value={noteTitle}
            onChangeText={setNoteTitle}
          />

          <CustomNormalTextInput
            label="Start Date"
            rightIcon="calendar-number-outline"
            rightIconType="Ionicons"
            value={formatDate(startDate)}
            editable={false}
            onPressRight={() => setShowStartPicker(true)}
          />

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
            value={noteDescription}
            onChangeText={setNoteDescription}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={createNote}
            title={'Create Note'}
            // title={loading ? 'Creating...' : 'Create Note'}
            // disabled={loading}
          />
        </View>
      </CustomMargin>

      <Modal visible={showStartPicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <CalendarPicker
            onDateChange={onStartDateChange}
            selectedStartDate={startDate || undefined}
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
            onPress={() => setShowStartPicker(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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

export default Notes;

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
    borderRadius: moderateScale(8),
  },
  closeButtonText: {
    color: colors.white,
  },
  calendarTitleStyle: {
    color: colors.white,
  },
  selectedDayTextStyle: {
    color: colors.white,
  },
  todayTextStyle: {
    color: colors.white,
  },
  calendarTextStyle: {
    color: colors.white,
  },
});
