/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ListRenderItemInfo,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useQuery} from '@tanstack/react-query';

import productsData from '../data/products.json';

const fetchSearchResults = (query: string) => {
  return new Promise<any[]>(resolve => {
    setTimeout(() => {
      const filteredResults = productsData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      resolve(filteredResults);
    }, 500);
  });
};

interface SearchProps {
  passQueryfn: (x: string) => void;
  passQv: string;
}

const SearchBar: React.FC<SearchProps> = ({passQueryfn, passQv}) => {
  return (
    <View>
      <View style={[styles.searchInput]}>
        <TextInput
          placeholder={'Please search for products..'}
          onChangeText={text => passQueryfn(text)}
          value={passQv}
        />
      </View>
    </View>
  );
};

const ProductListing = ({navigation}: any) => {
  const [query, setQuery] = useState('');
  const {data, error, isLoading, isError} = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query),
    enabled: query.length > 0,
  });

  const passfn = (x: string) => {
    setQuery(x);
  };

  const renderItem = ({
    item,
  }: ListRenderItemInfo<{
    image: string | undefined;
    id: number;
    name: string;
  }>) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate('ProductDetails', {item: item})}
        style={styles.item}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.title}>{item?.name}</Text>
        </View>
        <Image
          source={{uri: item?.image}} // Replace with actual image paths
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 40,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 0.8}}>
      {isError ? (
        <View>
          <Text>{error.message}</Text>
        </View>
      ) : (
        <View style={{backgroundColor: 'white'}}>
          <SearchBar passQueryfn={passfn} passQv={query} />
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={{}}>
              <FlatList
                style={{marginTop: 5, height: 800}}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item): any => item.id}
                windowSize={5}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#ff6347', // Tomato color for price
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  header: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#efe1d1',
    padding: 8,
    marginVertical: 5,
  },
  searchInput: {
    height: 40,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default ProductListing;
