/* eslint-disable react-native/no-inline-styles */
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartSlice';

const ProductDetails = ({navigation}: any) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {name, variations, details} = route?.params?.item;
  console.log(variations);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };
  const handleAddToCart = (product: any) => {
    console.log('fire');
    dispatch(addToCart(product));
    navigation.navigate('Cart', {sku: 1233});
  };
  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24, marginBottom: 10}}>Item Name : {name}</Text>
      <Text style={{fontSize: 24, marginBottom: 10}}>
        Item Description : {details}
      </Text>
      <Text style={{fontSize: 24, marginBottom: 10}}>pick one below -- </Text>
      {variations.length > 0 &&
        variations.map((item: any) => {
          console.log('...', item);
          return (
            <TouchableOpacity
              key={item}
              style={styles.radioButton}
              onPress={() => handleRadioChange(item)}>
              <View
                style={[
                  styles.radioCircle,
                  selectedOption === item && styles.selectedCircle,
                ]}
              />
              <Text style={styles.option}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      <View style={{borderWidth: 1, marginVertical: 5}}>
        <Button
          title="ADD TO Cart"
          onPress={() => handleAddToCart(route?.params?.item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#000',
  },
  option: {
    fontSize: 16,
  },
});

export default ProductDetails;
