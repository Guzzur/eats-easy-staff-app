import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null
    };
  }
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                  text: 'Yes',
                  onPress: () => {
                    // remove item from menu
                    // origina line was
                    //flatListData.splice(this.props.index, 1);

                    //Refresh FlatList !
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: 'Delete',
          type: 'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'mediumseagreen'
            }}
          >
            <Image source={{ uri: this.props.item.imageUrl }} style={{ width: 100, height: 100, margin: 5 }} />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                height: 100
              }}
            >
              <Text style={styles.flatListItem}>{this.props.item.name}</Text>
              <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: 'white'
            }}
          />
        </View>
      </Swipeout>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16
  }
});

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null
    };
    this._onPressAdd = this._onPressAdd.bind(this);
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: activeKey
      };
    });
    this.refs.flatList.scrollToEnd();
  };
  _onPressAdd() {
    // alert("You add Item");
    // use network to add the item to the menu
    this.refs.addModal.showAddModal();
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
        <View
          style={{
            backgroundColor: 'tomato',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 64
          }}
        >
          <TouchableHighlight style={{ marginRight: 10 }} underlayColor="tomato" onPress={this._onPressAdd}>
            <Image style={{ width: 35, height: 35 }} source={require('../icons/icons-add.png')} />
          </TouchableHighlight>
        </View>
        <FlatList
          ref={'flatList'}
          //use network to put the menu in data
          //data={}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} parentFlatList={this} />;
          }}
        />
        <AddModal ref={'addModal'} parentFlatList={this} />
      </View>
    );
  }
}
