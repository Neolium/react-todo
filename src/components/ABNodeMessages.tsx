import * as React from 'react';

import { INode } from '../interfaces';
import ABLogFlow from './ABLogFlow';
import { Style } from '../builder';
import ABButton from './ABButton';
import { baseShadow } from '../styles';
import { ABColors } from '../enumerations';

export default class ABNodeMessages extends React.Component<{
  node: INode,
  nodes: {[key: string]: INode}
}> {

  private style = (self: ABNodeMessages) => ({
    root: new Style({
      ...baseShadow,
      height: '650px',
    }).padding('5px')
    .flex('column')
    .width('31%')
    .align('stretch')
    .build(),

    nodes: Style.flex().justify('flex-start').build(),
    header: new Style({
      marginBottom: '5px'
    }).flex()
    .align('center')
    .justify('space-between')
    .build(),

    nodeName: new Style({
      fontSize: '30px',
      fontWeight: 'bold'
    }).build(),
    state: new Style({
      ...baseShadow,
      color: ABColors.WHITE,
      backgroundColor: self.props.node.state === undefined ? ABColors.WHITE :
        self.props.node.state.state === 'leader' ?
        ABColors.PRIMARY : self.props.node.state.state === 'candidate' ? ABColors.CATCHY : ABColors.SECONDARY
    }).padding('5px 10px').build(),

    peers: new Style({
      color: ABColors.MINOR
    }).padding('5px 0px')
    .flex()
    .build(),
    
    actions: new Style({
    }).flex().build(),

    headerLeft: Style.flex().center().build(),
    term: new Style({
      marginLeft: '10px',
      backgroundColor: self.props.node.state.term === -1 ? ABColors.DANGER : self.props.node.theme.minor,
      borderRadius: '30px',
      height: '30px',
      textAlign: 'center',
      color: ABColors.WHITE,
    }).flex().center().width('30px').build(),

    peer: new Style({
      backgroundColor: ABColors.DARK,
      color: ABColors.WHITE,
      borderRadius: '5px',
      marginRight: '10px'
    }).padding('5px').build()
  })

  private getPeerStyle(peer: string) {
    if (Object.keys(this.props.nodes).indexOf(peer) !== -1) {
      return {
        ...this.style(this).peer,
        backgroundColor: this.props.nodes[peer].theme.minor
      };
    } else {
      return this.style(this).peer;
    }
  }

  public render() {
    return (
      <div style={this.style(this).root}>
        <div style={this.style(this).header}>
          <div style={this.style(this).headerLeft}>
            <div style={this.style(this).nodeName}>{this.props.node.nodePort}</div>
            <span style={this.style(this).term}>{this.props.node.state.term}</span>
          </div>
          <div style={this.style(this).state}>{this.props.node.state.state}</div>
        </div>
        <div style={this.style(this).peers}>
          {
            this.props.node.state.peers.length > 0 ?
              this.props.node.state.peers.map((peer, index) => {
                return <span style={this.getPeerStyle(peer)} key={index}>{peer}</span>;
              }) :

              'No peers connected'
          }
        </div>
        <ABLogFlow node={this.props.node} />
        <div style={this.style(this).actions}>
          <ABButton theme={this.props.node.theme} label="Kill"onClick={console.log}/>
          <ABButton theme={this.props.node.theme} label="Set Leader" onClick={console.log}/>
          <ABButton theme={this.props.node.theme} label="Set Follower" onClick={console.log}/>
          <ABButton theme={this.props.node.theme} label="Set Candidate" onClick={console.log}/>
        </div>
        
      </div>
    );
  }
}