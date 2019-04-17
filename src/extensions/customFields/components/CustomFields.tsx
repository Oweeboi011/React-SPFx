import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './CustomFields.module.scss';

export interface ICustomFieldsProps {
  text: string;
}

const LOG_SOURCE: string = 'CustomFields';

export default class CustomFields extends React.Component<ICustomFieldsProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: CustomFields mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: CustomFields unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        <img src='http://aux2.iconspalace.com/uploads/outline-sharepoint-icon-256.png' height='20px'></img>
        { "Testing Customized Field" }
      </div>
    );
  }
}
