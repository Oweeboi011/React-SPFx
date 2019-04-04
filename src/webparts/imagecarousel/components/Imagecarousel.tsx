import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './Imagecarousel.module.scss';
import { IImagecarouselProps } from './IImagecarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
//import Carousel from 'react-bootstrap/Carousel'
import ListviewWebPart from '../../listview/ListviewWebPart'
import { SPComponentLoader } from '@microsoft/sp-loader';

require('jquery');
require('bootstrap');
require('popper.js');

export default class Imagecarousel extends React.Component<IImagecarouselProps, {}> {
  constructor(props: IImagecarouselProps) {
    super(props);
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
 } 
  public render(): JSX.Element {
    return (
      <div>
      {/* <ListviewWebPart></ListviewWebPart> */}
      <div className={styles.container}>
      <div id="carouselExampleIndicators" className="carousel slide"  data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://surlybikes.com/uploads/bikes/_medium_image/LHT_BK0417.jpg" alt="Long Haul Trucker (LHT)" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Long Haul Trucker</h1>
              <p>Designed for comfort while simultaneously hauling a lot of stuff long distances, many consider Long Haul Trucker to be the gold standard of touring bikes. It features everything a long-distance bicycle tourist would need when traversing the globe.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://surlybikes.com/uploads/bikes/_medium_image/BridgeClub_BK9997.jpg" alt="Bridge Club" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Bridge Club</h1>
              <p>Bridge Club is for those multi-surface outings — planned or unplanned. We've all run out the clock on a dirt tour and had to add in some paved shortcuts. Conversely, when you’re feeling a little zesty on your next road tour, Bridge Club is ready for reroutes through the woods.</p>
            </div>
            </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://surlybikes.com/uploads/bikes/_medium_image/Straggler_BK7804.jpg" alt="Straggler" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Straggler</h1>
              <p>Straggler is tuned for cross-over exploration on a wide variety of terrain conditions. It’s a day-tripper and a weekender. It’s a ‘rough road’ road bike, a cyclocross bike with no pretense about racing, a utilitarian townie, a light-duty touring bike and an all-weather commuter. </p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://surlybikes.com/uploads/bikes/_medium_image/ICT_BK0166.jpg" alt="Ice Cream Truck (ICT)" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Ice Cream Truck</h1>
              <p>From log and root covered ribbons of twisty singletrack to miles of powdery snow or sandy beaches, Ice Cream Truck can handle it all. Hell, you could probably even hop over a grizzly if the situation arises. Probably.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://surlybikes.com/uploads/bikes/_medium_image/MidnightSpecial_BK0705.jpg" alt="Midnight Special" />
            <div className="carousel-caption d-none d-md-block">
              <h1>Midnight Special</h1>
              <p>Midnight Special shines on pot-holed, deteriorating pavement and the occasional long stretch of gravel. Its 650b road plus tires eat up road chatter and absorb all the bumps in the road like the champion it was designed to be.</p>
            </div>
          </div>

        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      </div>
      </div>
    );
  }
}
