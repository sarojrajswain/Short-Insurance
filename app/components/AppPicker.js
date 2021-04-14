import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import AppTextInput from './AppTextInput';
import _ from 'lodash';

export default function AppPicker({
  icon,
  items,
  placeholder,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
  selectedItem,
  onSelectItem,
  selectedLabel,
  width = "100%",
  filterKey,
  valueKey,
  captionKey,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = filteredDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        // const itemData = item.label
        //   ? item.label.toUpperCase()
        //   : "".toUpperCase();
        const itemData = item[captionKey]
          ? item[captionKey].toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource([...new Set(newData)]);
      setSearch(text);
    } else {
      if(filterKey){
        console.log(filterKey);
        setFilteredDataSource(() => {
          return items.filter((cntry) => cntry.year === filterKey);
        });
      }
      else
      {
        console.log(items);
        const test=[...new Set(items)]
        setFilteredDataSource(_.uniqBy(items,'year'));
      }

      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      //setFilteredDataSource(vehicleMake);
      setSearch(text);
    }
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => {
          //searchFilterFunction();
          // setVehicleMake(() => {
          //   return items.filter((cntry) => cntry.year === key);
          // });
          searchFilterFunction("");
          setModalVisible(true);
        }}
      >
        <View style={[styles.container, { width }]}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
          {selectedLabel ? (
            <AppText style={styles.text}>{selectedLabel}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={modalVisible}
        animationType="slide"
        animationType={"fade"}
      >
        <Screen>
          <Button onPress={() => setModalVisible(false)} title="close" />
          <AppTextInput
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
          <FlatList
            numColumns={numberOfColumns}
            data={filteredDataSource}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item[captionKey]}
                onPress={() => {
                  console.log(item);
                  setModalVisible(false);
                  onSelectItem(item);
                  setSearch("");
                  setFilteredDataSource(items);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    marginVertical: 10,
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
  },
  text: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
});
