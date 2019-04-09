import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './Imagecarousel.module.scss';
import { IImagecarouselProps } from './IImagecarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
//import Carousel from 'react-bootstrap/Carousel'
import ListviewWebPart from '../../listview/ListviewWebPart'
import { SPComponentLoader } from '@microsoft/sp-loader';

//calling common service
import { renderImageCarousel } from '../../../services/o365SP_CommonService';
import * as $ from "jquery"
import * as bootstrap from 'bootstrap';
// require('jquery');
// require('bootstrap');
require('popper.js');

export interface imageCarouselState {
  searchTitle: string;
  searcDescription: string;
  searchThumbnail: string;
}

function ModalComp (searchThumbnail : any) {
  const imgPrev = Object["values"](searchThumbnail).join(' ').replace(/\s/g, '');
    return (
      
      <div className="modal fade" id="modalComp" role="dialog" data-tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl bd-example-modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header primary bg-dark">
              <h5 className="modal-title text-secondary" id="exampleModalLabel">REACT SPFX ALERT</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <a className=" text-secondary">FEATURE NOT YET READY: IMAGE PREVIEW</a>
              <img className="d-block w-100" src={imgPrev} alt="preview image" />
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>

    )
  };

export default class Imagecarousel extends React.Component<IImagecarouselProps, {}> {
  constructor(props: IImagecarouselProps) {
    super(props);
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    renderImageCarousel(this.props, this);
  }

  //update state
  public state: imageCarouselState = {
    searchTitle: "",
    searcDescription: "",
    searchThumbnail: "https://google.com/"
  };
  private _imgItems: {
    Title: string,
    Description: string,
    Thumbnail: string
  }[] = [];

  private previewImage = (imgStr): void => {
    //  $(window).on("load",function(){
    this.setState({ searchThumbnail:  imgStr });

    $.noConflict();
    $('#modalComp').modal('toggle');
    if ($(".modal-backdrop").length > 1) {
      $(".modal-backdrop").not(':first').remove();
    }
    $(".modal-backdrop").css('z-index', '-1');
    //   });

  };

  public render(): JSX.Element {
    
    return (
      <div>
        <div className="imagecarousel">

          <div className={styles.container}>
            <div id="carouselExampleIndicators" className="carousel slide text-center" data-ride="carousel">
              <ol className="carousel-indicators">
                {this._imgItems.map((imgs, i) => {
                  return i.toString() == "0" ?
                    <li data-target="#carouselExampleIndicators" data-slide-to={i.toString()} className="active"></li>
                    :
                    <li data-target="#carouselExampleIndicators" data-slide-to={i.toString()}></li>
                })}
              </ol>
              <div className="carousel-inner">
                {this._imgItems.map((imgs, i) => {
                  return i.toString() == "0" ?
                    <div className="carousel-item active">
                      <a onClick={e => this.previewImage(imgs.Thumbnail)}>
                        {/* <a data-toggle="modal" data-target="#modalComp"> */}
                        <img className="d-block w-50 rounded mx-auto d-block" src={imgs.Thumbnail} alt={imgs.Title} />
                      </a>
                      <div className="carousel-caption d-none mx-auto d-md-block w-50">
                        <h1>{imgs.Title}</h1>
                        <p>{imgs.Description}</p>
                      </div>
                    </div>
                    :
                    <div className="carousel-item">
                      <a onClick={e => this.previewImage(imgs.Thumbnail)}>
                        {/* <a data-toggle="modal" data-target="#modalComp"> */}
                        <img className="d-block w-50 rounded mx-auto d-block" src={imgs.Thumbnail} alt={imgs.Title} />
                      </a>
                      <div className="carousel-caption d-none mx-auto d-md-block w-50">
                        <h1>{imgs.Title}</h1>
                        <p>{imgs.Description}</p>
                      </div>
                    </div>
                })}
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                {/* <img className="d-block w-50 rounded mx-auto d-block" src={imgs.Thumbnail} alt={imgs.Title} /> */}
                <span className="sr-only">Next</span>
              </a>

            </div>
          </div>

        </div>
        <ModalComp {...this.state.searchThumbnail}></ModalComp>
      </div>

    );
  }
}
