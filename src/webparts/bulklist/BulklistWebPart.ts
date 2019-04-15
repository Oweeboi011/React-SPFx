import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from '../bulklist/components/Bulklist.module.scss';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'BulklistWebPartStrings';
import Bulklist from './components/Bulklist';
import { IBulklistProps } from './components/IBulklistProps';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface IBulklistWebPartProps {
  description: string;
  name: string;
  siteUrl: string;
  listName: string;
  searchTitle: string;
  searcDescription: string;
  searchThumbnail: string;
  spHttpClient: SPHttpClient;
  ShowLoading: boolean;
  parentContext: any;
  targetDom: any;
}

export function _loadingSpinner(open: boolean, message: string, iProps: any): void{
  if(open){
    iProps.parentContext.statusRenderer.displayLoadingIndicator(iProps.targetDom, message);    
  }else{
    iProps.parentContext.statusRenderer.clearLoadingIndicator(iProps.targetDom);
  }
}
export default class BulklistWebPart extends BaseClientSideWebPart<IBulklistWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBulklistProps> = React.createElement(
      Bulklist,
      {
        description: this.properties.description,
        name: this.properties.name,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName,
        searchTitle: "",
        searcDescription: "",
        searchThumbnail: "",
        spHttpClient: this.context.spHttpClient,
        ShowLoading: true,
        parentContext: this.context,
        targetDom: this.domElement
      }
    );
    
    ReactDom.render(element, this.domElement);
    // if(this.properties.ShowLoading){
    // this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Wait ka lang paps....");
    // }else{
    //   this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    // }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      //showLoadingIndicator: this.properties.ShowLoading,   
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
