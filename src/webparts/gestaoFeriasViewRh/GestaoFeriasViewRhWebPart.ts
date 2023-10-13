import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import GestaoFeriasViewRh from './components/GestaoFeriasViewRh';
import { IGestaoFeriasViewRhProps } from './components/IGestaoFeriasViewRhProps';

export default class GestaoFeriasViewRhWebPart extends BaseClientSideWebPart<IGestaoFeriasViewRhProps> {
  public render(): void {
    const element: React.ReactElement<IGestaoFeriasViewRhProps> = React.createElement(
      GestaoFeriasViewRh,
      {
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return Promise.resolve()
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
