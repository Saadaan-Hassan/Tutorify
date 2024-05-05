import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Divider, Text, Dialog, Portal, TextInput } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { commonStyles } from '../styles/commonStyles';
import { useNavigation } from '@react-navigation/native';

const LeftContent = props => (
  <Avatar.Image
    {...props}
    source={require("../../assets/img/avatar/user1.png")}
    size={80}
  />
);

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const checkPassword = () => {
    hideDialog();
    navigation.navigate("ProfilePassword");
  };

  return (
    <View style={styles.container}>
      <Card.Title
        title='Damilola John'
        subtitle='High school student'
        style={{ marginVertical: 20 }}
        titleStyle={{
          fontSize: 24,
          fontWeight: "bold",
          minHeight: 25,
          color: commonStyles.colors.textPrimary,
        }}
        subtitleStyle={{
          fontSize: 16,
          color: commonStyles.colors.textSecondary,
        }}
        left={LeftContent}
        leftStyle={{ marginRight: 60 }}
      />

      <View style={{ marginTop: 20 }}>
        <CustomButton
          icon={"account"}
          title='Account'
          style={styles.button}
          contentStyle={{ justifyContent: "flex-start" }}
          textColor={commonStyles.colors.primary}
          onPress={() => {
            navigation.navigate("ProfileInfo");
            console.log("Account pressed");
          }}
        />
        <Divider />
        <CustomButton
          icon={"lock"}
          title='Password'
          style={styles.button}
          contentStyle={{ justifyContent: "flex-start" }}
          textColor={commonStyles.colors.primary}
          onPress={showDialog}
        />
        <Divider />
        <CustomButton
          icon={"bell"}
          title='Notifications'
          style={styles.button}
          contentStyle={{ justifyContent: "flex-start" }}
          textColor={commonStyles.colors.primary}
        />
        <Divider />
        <CustomButton
          icon={"shield-account"}
          title='Privacy Policy'
          style={styles.button}
          contentStyle={{ justifyContent: "flex-start" }}
          textColor={commonStyles.colors.primary}
          onPress={() => {
            navigation.navigate("ProfilePrivacy");
            // console.log("Privacy pressed");
          }}
        />
        {/* <Divider />
        <CustomButton
          icon={"help-circle"}
          title='Help'
          style={styles.button}
          contentStyle={{ justifyContent: "flex-start" }}
          textColor={commonStyles.colors.primary}
        /> */}
        <Divider />
        <CustomButton
          icon={"power"}
          title='Logout'
          style={styles.button}
          contentStyle={{ justifyContent: "flex-start" }}
          textColor={commonStyles.colors.tertiary}
        />
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Password</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={checkPassword}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.neutral,
  },
  button: {
    width: "100%",
    borderRadius: 0,
    marginTop: 10,
    paddingTop: 5,
    marginBottom: 0,
    height: 50,
    backgroundColor: commonStyles.colors.neutral,
  },
};
