import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

import * as strings from 'ListviewWebPartStrings';
import Listview from './components/Listview';
import { IListviewProps } from './components/IListviewProps';

export interface IListviewWebPartProps {
  description: string;
  name: string;
  siteUrl: string;
  listName: string;
  searchTitle: string;
  searcDescription: string;
  searchThumbnail: string;
  spHttpClient: SPHttpClient;
}

export default class ListviewWebPart extends BaseClientSideWebPart<IListviewWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListviewProps > = React.createElement(
      Listview,
      {
        description: this.properties.description,
        name: this.properties.name,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName,
        searchTitle: "",
        searcDescription: "",
        searchThumbnail: "",
        spHttpClient: this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
