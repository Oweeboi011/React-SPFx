import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Context } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IODataList } from '@microsoft/sp-odata-types';

export function renderDataGrid(currentProps, currentState): any {
  currentState._spItems = [];

  //------- COMMENTED FOR TEST
  // let currentWebUrl = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365" //test live URL
  // let _requestUrl = currentWebUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/items")
  // // let _requestUrl = currentProps.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/items")
  // console.log(_requestUrl);
  // currentProps.spHttpClient.get(_requestUrl, SPHttpClient.configurations.v1)
  //------- COMMENTED FOR TEST
  //execute service    
  let currentWebUrl = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365" //test live URL
  let _requestUrl = currentWebUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/GetItems")
  let _camlSingleQuery = "<View><Query></Query></View>"
  const camlQueryPayLoad: any = {
    query: {
      __metadata: { type: 'SP.CamlQuery' },
      ViewXml: _camlSingleQuery
    }
  };
  let postOptions: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(camlQueryPayLoad) };
  //currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          if (responseJSON != null && responseJSON.value != null) {
            responseJSON.value.map((list: IODataList) => {
              currentState._spItems.push({ Title: list.Title, Description: list.Description, Thumbnail: list.Thumbnail  }); //
            });
            currentState.forceUpdate();
            //   currentState.setState({ searchId: 0, searchTitle: "", searcDescription: "" });
          }
        })
      }
    });
};
export function searchSingleListItem(searchText, currentProps, currentEtag, currentState) {
  alert("Searching for " + "'" + searchText + "'");
  //execute service    
  let currentWebUrl = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365" //test live URL
  let _requestUrl = currentWebUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/GetItems")
  let _camlSingleQuery = "<View><Query><Where><Contains><FieldRef Name='Title' /><Value Type='Text'>" + searchText + "</Value></Contains></Where></Query></View>"
  const camlQueryPayLoad: any = {
    query: {
      __metadata: { type: 'SP.CamlQuery' },
      ViewXml: _camlSingleQuery
    }
  };
  let postOptions: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(camlQueryPayLoad) };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    //currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          console.log(responseJSON.value);
          if (responseJSON != null && responseJSON.value != null) {
            currentEtag = response.headers.get('ETag');
            responseJSON.value.map((list: IODataList) => {
              currentState.setState({ searchId: list.Id, searchTitle: list.Title, searcDescription: list.Description });
            });
            renderDataGrid(currentProps, currentState);
          }
        })
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showErrorMSGBR: true }); }
    });
};
export function editSingleListItem(searchText, currentProps, currentEtag, currentState) {
  console.log('Current value: ' + currentState.state.searchTitle + '|' + currentState.state.searcDescription);

  //clear container
  let _spSearchItems = [];
  alert("Editing for Item #" + "'" + currentState.state.searchId.toString() + "'");
  //execute service
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/items('" + currentState.searchId + "')")
  const camlQueryPayLoad: any = {
    // query: {
    //   __metadata: { type: 'SP.Data.MyListListItem' },
    'Title': currentState.searchTitle,
    'Description': currentState.searcDescription
    //}
  };
  let postOptions: ISPHttpClientOptions =
  {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=nometadata',
      'odata-version': '',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'MERGE'
    },
    body: JSON.stringify(camlQueryPayLoad)
  };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    //currentState.props.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        renderDataGrid(currentProps, currentState);
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showErrorMSGBR: true }); }
    });
};
export function addSingleListItem(searchText, currentProps, currentEtag, currentState) {
  console.log('Current value: ' + currentState.state.searchTitle + '|' + currentState.state.searcDescription);

  //clear container
  let _spSearchItems = [];
  alert("Add for Item #" + "'" + currentState.state.searchId.toString() + "'");
  //execute service
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/items")
  const camlQueryPayLoad: any = {
    // query: {
    //  __metadata: { type: 'SP.Data.MyListListItem' },
    'Title': currentState.state.searchTitle,
    'Description': currentState.state.searcDescription
    //}
  };
  let postOptions: ISPHttpClientOptions =
  {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=nometadata',
      'odata-version': '',
      // 'IF-MATCH': '*',
      // 'X-HTTP-Method': 'MERGE'
    },
    body: JSON.stringify(camlQueryPayLoad)
  };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    //currentState.props.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        renderDataGrid(currentProps, currentState);
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showErrorMSGBR: true }); }
    });
};
export function deleteSingleListItem(searchText, currentProps, currentEtag, currentState) {
  console.log('Current value: ' + currentState.searchTitle + '|' + currentState.searcDescription);

  //clear container
  let _spSearchItems = [];
  alert("Deleting for Item #" + "'" + currentState.searchId.toString() + "'");
  //execute service
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "AkuminaSampleListLibrary" + "')/items('" + currentState.searchId + "')")
  const camlQueryPayLoad: any = {
    'Title': currentState.searchTitle,
    'Description': currentState.searcDescription
    //}
  };
  let postOptions: ISPHttpClientOptions =
  {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=nometadata',
      'odata-version': '',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'DELETE'
    },
    body: JSON.stringify(camlQueryPayLoad)
  };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    //currentState.props.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        renderDataGrid(currentProps, currentState);
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showErrorMSGBR: true }); }
    });
};
export class o365SP_CommonService {
  private _spHttpClient: SPHttpClient;


}