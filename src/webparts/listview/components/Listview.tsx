import * as React from 'react';
import mainStyle from './Listview.module.scss';
import { IListviewProps } from './IListviewProps';
import { escape } from '@microsoft/sp-lodash-subset';

//fabric UI office
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, ActionButton, IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps, ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Dialog, DialogType, DialogFooter, DialogBase, DialogContent } from 'office-ui-fabric-react/lib/Dialog';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

//force office fabric scss
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons('dist/');

//calling common service
import { o365SP_CommonService, renderDataGrid, searchSingleListItem, editSingleListItem, addSingleListItem, deleteSingleListItem } from '../../../services/o365SP_CommonService';

const log = (text: string): (() => void) => (): void => console.log(text);
let etag: string = undefined;

export interface listviewtState {
  hideDialog: boolean;
  showSuccessMSGBR: boolean;
  showErrorMSGBR: boolean;
  searchTitle: string;
  searcDescription: string;
  searchThumbnail: string;
  searchId: number,
  errorMessage: string,
  successMessage: string
}

export default class Listview extends React.Component<IListviewProps, {}> {
  private _selection: Selection;
  constructor(props: IListviewProps) {
    super(props);
    renderDataGrid(this.props, this);
  }

    //update state
    public state: listviewtState = {
      hideDialog: true,
      searchTitle: "",
      searcDescription: "",
      searchThumbnail: "",
      searchId: 0,
      errorMessage: "",
      successMessage: "",
      showSuccessMSGBR: false,
      showErrorMSGBR: false
    };
    private _labelId: string = getId('dialogLabel');
    private _subTextId: string = getId('subTextLabel');

  public render(): JSX.Element {
    return (
      <div className="listview">
        <div>
          <h2> <Icon iconName="OfficeAssistantLogo" className="ms-IconExample" />&nbsp; Intergalactic Surly Bikes</h2>
          <p>Customize SharePoint experiences using Web Parts.</p>
          {this.state.showErrorMSGBR && <MessageBar messageBarType={MessageBarType.error} isMultiline={false} onDismiss={() => this.closeErrorMessageBar()} dismissButtonAriaLabel="Close">
            ERROR: An error was encoutered while processing your request.
    </MessageBar>}
          {this.state.showSuccessMSGBR && <MessageBar messageBarType={MessageBarType.success} isMultiline={false} onDismiss={() => this.closeSuccessMessageBar()} dismissButtonAriaLabel="Close">
            SUCCESS: Successfully processed your request.
    </MessageBar>}
          <ActionButton
            data-automation-id="test"
            iconProps={{ iconName: 'AddFriend' }}
            // allowDisabledFocus={true}
            disabled={false}
            checked={false}
            onClick={this._showCRUDDialog} >
            Add/Update Bikes.
              </ActionButton>
        </div>

        <FocusZone direction={FocusZoneDirection.vertical}>
          <List items={this._spItems} onRenderCell={this._onRenderCell} />
        </FocusZone>

        {/* DIALOG: CRUD List Item */}
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeCRUDDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Bike Record Manager',
            subText: 'This dialog will be help you on inserting list item in a particular SharePoint List'
          }}
          modalProps={{
            titleAriaId: this._labelId,
            subtitleAriaId: this._subTextId,
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride modal-lg'
          }}
        >
          <SearchBox
            placeholder="Search List Item"
            onSearch={newValue => searchSingleListItem(newValue, this.props, etag, this)}
            onFocus={() => console.log('onFocus called')}
            onBlur={() => console.log('onBlur called')}
            onChange={() => console.log('onChange called')}
          />
          <h2>Details:</h2>
          {/* <TextField label="Item Id" value={this.state.searchId.toString()} /> */}
          <TextField label="Bike Name" value={this.state.searchTitle} onBlur={e => this._onChange_searchTitle(e)} />
          <Image className={mainStyle.itemImage} src={this.state.searchThumbnail} width={100} height={100} imageFit={ImageFit.cover} />
          <TextField label="Bike Thumbnail Url" value={this.state.searchThumbnail} />
          <TextField label="Bike Description" value={this.state.searcDescription} multiline autoAdjustHeight onBlur={e => this._onChange_searcDescription(e)} />
          <DialogFooter>
            {/* <PrimaryButton onClick={this._closeCRUDDialog} text="Add New" /> */}
            <DefaultButton
              primary
              data-automation-id="test"
              disabled={false}
              checked={false}
              text="New Bike"
              onClick={(ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
                addSingleListItem(this.state.searchTitle, this.props, etag, this);

                ev.preventDefault();
              }}
              iconProps={{ iconName: 'Add' }}
              split={true}
              aria-roledescription={'split button'}
              style={{ height: '35px' }}
              menuProps={{
                items: [
                  {
                    key: 'emailMessage',
                    name: 'Edit Bike',
                    iconProps: { iconName: 'EditNote' },
                    onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
                      editSingleListItem("", this.props, etag, this);
                      ev.preventDefault();
                    },
                  },
                  {
                    key: 'calendarEvent',
                    name: 'Delete Bike',
                    iconProps: { iconName: 'Delete' },
                    onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
                      alert('Link clicked');
                      deleteSingleListItem("", this.props, etag, this);
                      ev.preventDefault();
                    },
                  }
                ]
              }}
            />
            <DefaultButton onClick={this._closeCRUDDialog} text="Cancel" />
            <div>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _spItems: {
    Title: string,
    Description: string,
    Thumbnail: string
  }[] = [];
  private _getMenu = (menuProps: IContextualMenuProps): JSX.Element => {
    // Customize contextual menu with menuAs
    return <ContextualMenu {...menuProps} />;
  };
  private _onRenderCell(item: any, index: number | undefined): JSX.Element {
    return (
      // <div className={FabricUIModule1_.defaultFabricv1}>
      <div className={mainStyle.listview}>
        <div className={mainStyle.itemCell} data-is-focusable={true}>
          <Image className={mainStyle.itemImage} src={item.Thumbnail} width={100} height={100} imageFit={ImageFit.cover} />
          <div className={mainStyle.itemContent}>
            <div className={mainStyle.itemName}>{item.Title}</div>
            {/* <div className={mainStyle.itemIndex}>{`Item ${index}`}</div> */}
            <div className={mainStyle.itemContent}>{item.Description}</div>
          </div>
          <Icon className={mainStyle.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
        </div>
      </div>

    );
  }
  private _showCRUDDialog = (): void => {
    this.setState({ hideDialog: false, searchTitle: "", searcDescription: "" });
  };
  private _closeCRUDDialog = (): void => {
    this.setState({ hideDialog: true, searchTitle: "", searcDescription: "" });
  };
  private alertClicked = (): void => {
    alert('Clicked');
  };
  private _onChange_searcDescription = (evt: any): void => {
    this.setState({ searcDescription: evt.target.value });
  };
  private _onChange_searchTitle = (evt: any): void => {
    this.setState({ searchTitle: evt.target.value });
  };
  private closeSuccessMessageBar = (): void => {
    this.setState({ showSuccessMSGBR: true });
    setTimeout(
      function () {
        this.setState({ showSuccessMSGBR: false });
      }
        .bind(this),
      1000
    );
  };
  private closeErrorMessageBar = (): void => {
    this.setState({ showErrorMSGBR: true });
    setTimeout(
      function () {
        this.setState({ showErrorMSGBR: false });
      }
        .bind(this),
      1000
    );
  };

}


