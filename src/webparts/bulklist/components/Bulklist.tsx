import * as React from 'react';
import styles from './Bulklist.module.scss';
import { IBulklistProps } from './IBulklistProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { _loadingSpinner } from '../BulklistWebPart';

//force office fabric scss
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons('dist/');
import { renderBatch5k, render5k } from '../../../services/o365SP_CommonService';


export default class Bulklist extends React.Component<IBulklistProps, {}> {
  private _selection: Selection;
  constructor(props: IBulklistProps) {
    super(props);
    render5k(this.props, this);
  }
  public render(): React.ReactElement<IBulklistProps> {
    return (

      <div className={styles.bulklist}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <List items={this._spItems} onRenderCell={this._onRenderCell} />
        </FocusZone>
      </div>
    );
  }
  private _onRenderCell(item: any, index: number | undefined): JSX.Element {
    return (
      // <div className={FabricUIModule1_.defaultFabricv1}>
      <div className={styles.container}>
        <div className={styles.itemCell} data-is-focusable={true}>
          <Image className={styles.itemImage} src={item.Thumbnail} width={100} height={100} imageFit={ImageFit.cover} />
          <div className={styles.itemContent}>
            <div className={styles.itemName}>{item.Title}</div>
            <div className={styles.itemContent}>{item.Source}</div>
            <div className={styles.itemContent}>{item.Transaction}</div>
            <div className={styles.itemContent}>{item.EventDate}</div>
            <div className={styles.itemContent}>{item.UserName}</div>
          </div>
          <Icon className={styles.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
        </div>
      </div>
    );
  }
  private _spItems: {
    Title: string,
    Source: string,
    Transaction: string,
    EventDate: string,
    UserName: string,
  }[] = [];
}
