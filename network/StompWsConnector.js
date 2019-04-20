import React from 'react';
import { View } from 'react-native';
import SockJsClient from 'react-stomp';
import Urls from '../constants/Urls';

export default class StompWsConnector extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage = (msg) => {
    this.clientRef.sendMessage('/app', msg);
  };

  render() {
    return (
      <View>
        <SockJsClient
          url={Urls.wsRootUrl}
          topics={[ '/topic/all' ]}
          onMessage={async (msg) => await this.props.onMessage(msg)}
          ref={(client) => {
            this.clientRef = client;
          }}
          debug={false}
        />
      </View>
    );
  }
}
