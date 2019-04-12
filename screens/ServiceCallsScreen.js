import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import { commonStyles } from '../styles';

import LoadingCircle from '../components/LoadingCircle';

class ServiceCallsScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: 'loading',
      data: [],
      user: null
    };
  }

  render() {
    return (
      <View style={[ commonStyles.container, commonStyles.paddingNone ]}>
        {this.state.data !== {} && this.state.status !== 'loading' ? (
          <Grid>
            <Col style={commonStyles.column}>{this.state.data.map(this.renderItem)}</Col>
          </Grid>
        ) : (
          <LoadingCircle />
        )}
      </View>
    );
  }

  async componentWillMount() {
    try {
      let user = await this.storageManager._retrieveUserData();
      await this.setState({
        user: user
      });
      const restId = await getApiRestIdbyEmployee(this.state.user.userId);
      const orders = await getApiServiceCallsbyRestId(restId);
      this.setState({
        data: orders || [],
        status: 'loaded'
      });
    } catch (err) {
      console.error(err);
      this.setState({
        data: [],
        status: 'failed'
      });
    }
  }
}

renderItem = (serviceCall, i) => {
  return serviceCall ? (
    <View
      key={'call_' + i}
      style={[ commonStyles.container, commonStyles.shadowSmall, { height: 100, marginBottom: 5 } ]}
    >
      <Row style={commonStyles.row}>
        <Grid>
          <Row style={commonStyles.rowList}>
            <Col size={6} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
              <Text style={commonStyles.textMedium}>{serviceCall.tableId}</Text>
              <Text style={commonStyles.textSmall}>{serviceCall.reason}</Text>
            </Col>
            <Col size={1} style={[ commonStyles.columnList, commonStyles.justifyCenter ]}>
              <TouchableNativeFeedback
                onPress={async () => {
                  // update callWaiter and CallResolve through network, thhen re-render
                }}
                style={[
                  { width: 40, height: 40, padding: 0, margin: 0 },
                  commonStyles.centered,
                  commonStyles.justifyCenter
                ]}
              >
                <Icon name="bell" size={30} />
              </TouchableNativeFeedback>
            </Col>
          </Row>
        </Grid>
      </Row>
    </View>
  ) : (
    <View key={'no_call_' + i} />
  );
};

//do we need this?
export default withNavigation(ServiceCallsScreen);
