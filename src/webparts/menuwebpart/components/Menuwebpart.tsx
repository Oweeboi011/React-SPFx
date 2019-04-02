import * as React from 'react';
import styles from './Menuwebpart.module.scss';
import { IMenuwebpartProps } from './IMenuwebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

export default class Menuwebpart extends React.Component<IMenuwebpartProps, {}> {
  public onLinkClick = (ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    if (item && item.name === 'News') {
      alert('News link clicked');
    }
  }
  public render(): JSX.Element {
    return (
      <div>
      <div className="ms-NavExample-LeftPane">
        <Nav groups={[
            {
              links: [
                {
                  name: 'Home',
                  url: 'http://example.com',
                  links: [
                    {
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'MSN',
                      url: 'http://msn.com',
                      key: 'key2'
                    }
                  ],
                  isExpanded: true
                },
                {
                  name: 'Documents',
                  url: 'http://example.com',
                  key: 'key3',
                  isExpanded: true
                },
                {
                  name: 'Pages',
                  url: 'http://msn.com',
                  key: 'key4'
                },
                {
                  name: 'Notebook',
                  url: 'http://msn.com',
                  key: 'key5'
                },
                {
                  name: 'Communication and Media',
                  url: 'http://msn.com',
                  key: 'key6'
                },
                {
                  name: 'News',
                  url: 'http://cnn.com',
                  icon: 'News',
                  key: 'key7'
                }
              ]
            }
          ]}
          onLinkClick={this.onLinkClick}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={'key3'}
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