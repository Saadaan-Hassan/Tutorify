import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EmailVerificationScreen() {
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState([false, false, false, false]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const codeInputs = useRef([]);

  const handleVerificationCodeChange = (text, index) => {
    if (/^\d{0,1}$/.test(text)) {
      const newCode = verificationCode.split('');
      newCode[index] = text;
      setVerificationCode(newCode.join(''));
      setFocusedIndex(index);
      
      const newIsCodeValid = [...isCodeValid];
      newIsCodeValid[index] = text.length === 1;
      setIsCodeValid(newIsCodeValid);
    }
  };

  const handleVerifyCode = () => {
    navigation.navigate('AddLocation');
  };

  const focusNextInput = (index) => {
    if (index < 3) {
      codeInputs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      codeInputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.subtitle}>Please enter the 4-digit code sent to your email for verification</Text>
      <View style={styles.codeInputContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.codeInputWrapper,
              focusedIndex >= index && styles.codeInputWrapperFocused,
            ]}
            onPress={() => {
              if (isCodeValid[index - 1]) {
                codeInputs.current[index].focus();
              }
            }}
          >
            <TextInput
              ref={(ref) => (codeInputs.current[index] = ref)}
              style={styles.codeInput}
              keyboardType="numeric"
              onChangeText={(text) => handleVerificationCodeChange(text, index)}
              value={verificationCode[index] || ''}
              maxLength={1}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              onKeyPress={({ nativeEvent: { key } }) => {
                if (key === 'Backspace') {
                  focusPreviousInput(index);
                } else {
                  focusNextInput(index);
                }
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, isCodeValid.every((isValid) => isValid) ? styles.validButton : styles.invalidButton]}
        onPress={handleVerifyCode}
        disabled={!isCodeValid.every((isValid) => isValid)}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5316B6",
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: "#5316B6",
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInputWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 15,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInputWrapperFocused: {
    borderWidth: 2,
    borderColor: "#5316B6",
  },
  codeInput: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  validButton: {
    width: 350,
    height: 50,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5316B6',
  },
  invalidButton: {
    width: 350,
    height: 50,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b6a6bd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});




