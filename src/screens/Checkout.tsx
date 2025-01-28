import {StyleSheet, View, ScrollView, Alert, Text} from 'react-native';
import React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const Checkout = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^(\+?\d{1,4}[\s-])?(\(?\d{1,4}\)?[\s-])?\d{3}[\s-]?\d{4}$/,
        'Phone number is not valid',
      ),
    address: Yup.string()
      .required('Shipping address is required')
      .min(10, 'Address must be at least 10 characters'),
    creditCard: Yup.string()
      .required('Credit card number is required')
      .matches(/^\d{16}$/, 'Credit card number must be 16 digits'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  const onSubmit = (data: any) => {
    Alert.alert('Form Submitted', JSON.stringify(data, null, 2));
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              error={!!errors.name}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Phone Number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              keyboardType="phone-pad"
              error={!!errors.phone}
            />
          )}
        />
        {errors.phone && (
          <Text style={styles.error}>{errors.phone.message}</Text>
        )}
        <Controller
          control={control}
          name="address"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Shipping Address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              multiline
              numberOfLines={3}
              error={!!errors.address}
            />
          )}
        />
        {errors.address && (
          <Text style={styles.error}>{errors.address.message}</Text>
        )}

        <Controller
          control={control}
          name="creditCard"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Credit Card Number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              keyboardType="numeric"
              maxLength={16}
              error={!!errors.creditCard}
            />
          )}
        />
        {errors.creditCard && (
          <Text style={styles.error}>{errors.creditCard.message}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
