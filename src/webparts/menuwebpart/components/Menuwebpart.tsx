import * as React from 'react';
import styles from './Menuwebpart.module.scss';
import { IMenuwebpartProps } from './IMenuwebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

export default class Menuwebpart extends React.Component<IMenuwebpartProps, {}> {
  public onLinkClick = (ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {    
      ev.preventDefault();
      alert(item.name + ' link has been clicked. Please visit ' + item.url);
      window.open(item.url);
  }
  public render(): JSX.Element {
    return (
      <div>
      <div className="ms-NavExample-LeftPane">
        <Nav groups={[
            {
              links: [
                {
                  name: 'Adventure/Gravel Bikes',
                  url: '#',
                  links: [
                    {
                      name: 'Surly',
                      url: 'https://surlybikes.com/bikes',
                      key: 'key1'
                    },
                    {
                      name: 'All-City Cycles',
                      url: 'https://allcitycycles.com/bikes',
                      key: 'key2'
                    },
                    {
                      name: 'Soma Fabrications',
                      url: 'https://www.somafab.com/bikes-frames/bicycles',
                      key: 'key3'
                    },
                    {
                      name: 'Marin',
                      url: 'https://www.marinbikes.com/',
                      key: 'key4'
                    }
                  ],
                  isExpanded: true
                },
                {
                  name: 'Mountain Bikes',
                  url: '#',
                  key: 'key5',
                  isExpanded: true
                },
                {
                  name: 'Road Bikes',
                  url: '#',
                  key: 'key6'
                },
                {
                  name: 'Fixed Gear',
                  url: '#',
                  key: 'key7',
                  
                },
                {
                  name: 'BMX',
                  url: '#',
                  key: 'key8'
                },
              ]
            }
          ]}
          onLinkClick={this.onLinkClick}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={'key1'}
          expandButtonAriaLabel={'Expand or collapse'}
        />
      </div>
      </div>
    );
  }
  }
  class DivContent extends React.Component{
    render() {
      return (
        <div>
          <h1>This would be the DivContent</h1>
        </div>
      );
    }
  }
  class CompOWEE extends React.Component{
    render() {
      return (
        <div>
          <h1>This would be the CompOWEE</h1>
        </div>
      );
    }
  }