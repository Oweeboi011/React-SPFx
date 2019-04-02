import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ImagecarouselWebPartStrings';
import Imagecarousel from './components/Imagecarousel';
import { IImagecarouselProps } from './components/IImagecarouselProps';

require('jquery');
require('bootstrap');

export interface IImagecarouselWebPartProps {
  description: string;
}

export default class ImagecarouselWebPart extends BaseClientSideWebPart<IImagecarouselWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IImagecarouselProps > = React.createElement(
      Imagecarousel,
      {
        description: this.properties.description
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
