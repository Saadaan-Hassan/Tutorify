import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Card, Menu, RadioButton } from 'react-native-paper';
import { commonStyles } from "../styles/commonStyles";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";


export default function ProfileInfo() {
  const [visible, setVisible] = useState(false);
  const [subject, setSubject] = useState('Select a subject');
  const [mode, setMode] = useState('online');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View>
        <Card.Title
          title='Email:'
          subtitle='example@gmail.com'
          style={styles.cardTitle}
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
        />
        <Card.Title
          title='Account Type:'
          subtitle='Student / Teacher'
          style={styles.cardTitle}
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
        />
        <Card.Title
          title='Subjects:'
          style={styles.cardTitle}
          titleStyle={styles.titleStyle}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} mode="outlined">{subject}</Button>}
        >
          <Menu.Item onPress={() => { setSubject('Physics'); closeMenu(); }} title="Physics" />
          <Menu.Item onPress={() => { setSubject('Chemistry'); closeMenu(); }} title="Chemistry" />
          <Menu.Item onPress={() => { setSubject('Mathematics'); closeMenu(); }} title="Mathematics" />
        </Menu>

        <Card.Title
          title='Name:'
          style={styles.cardTitle}
          titleStyle={styles.titleStyle}
        />
        <View style={styles.inputView}>
          <CustomInput
            placeholder="Enter your name"
            value=""
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <Card.Title
          title='Academic Status:'
          style={styles.cardTitle}
          titleStyle={styles.titleStyle}
        />
        <View style={styles.inputView}>
          <CustomInput
            placeholder="Enter your academic status"
            value=""
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <Card.Title
          title='Mode:'
          style={styles.cardTitle}
          titleStyle={styles.titleStyle}
        />
        <RadioButton.Group onValueChange={newValue => setMode(newValue)} value={mode}>
          <View style={styles.radioButtonRow}>
            <RadioButton value="online" />
            <Text style={styles.radioButtonLabel}>Online</Text>
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton value="my_place" />
            <Text style={styles.radioButtonLabel}>Physical my own place</Text>
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton value="their_place" />
            <Text style={styles.radioButtonLabel}>Physical at their place</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.centered}>
        <CustomButton
          title='Edit Profile'
          style={styles.editButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.neutral,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  editButton: {
    width: "35%",
    fontSize: 18,
    marginTop: 20,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    minHeight: 25,
    color: commonStyles.colors.textPrimary,
    marginLeft: -15,
  },
  subtitleStyle: {
    fontSize: 16,
    color: commonStyles.colors.textSecondary,
    marginLeft: -5,
  },
  cardTitle: {
    marginVertical: 5
  },
  inputView: {
    marginTop: -20, 
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8
  }
});
