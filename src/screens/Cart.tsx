/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart, removeFromCart, updateQuantity} from '../redux/cartSlice';

const Cart = ({navigation}: any) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cart);
  if (cart.length === 0) {
    navigation.navigate('Products', {sku: 1233});
  }
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      dispatch(clearCart());
    }
    dispatch(updateQuantity({id, quantity}));
  };

  const renderCartItem = ({item}: any) => (
    <View style={styles.cartItem}>
      <Text style={styles.totalText}>{item.name}</Text>
      <Text style={styles.totalText}>SKU: {item.sku}</Text>
      <Text style={styles.totalText}>Type: {item.type}</Text>
      <Text style={styles.totalText}>Quantity:</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          style={styles.updateButton}>
          <Text style={styles.updateButtonText}>+</Text>
        </TouchableOpacity>
        <View style={styles.updateButton}>
          <Text>{item.quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          style={[styles.updateButton]}>
          <Text style={styles.updateButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item.id)}
          style={[styles.removeButton, {marginLeft: 20}]}>
          <Text style={styles.removeButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout', {cart: cart})}
          style={[
            styles.removeButton,
            {marginLeft: 20, width: '60%', backgroundColor: 'black'},
          ]}>
          <Text style={styles.removeButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  updateButton: {
    width: '10%',
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    width: '30%',
    backgroundColor: '#FF6347',
    padding: 8,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
  },
});
