import ExternalLink from '../ReusableComponents/ExternalLink/ExternalLink';
import { HeaderH1 } from '../ReusableComponents/Headers/Headers';
import MultiLineText from './MultiLineText';
import Burger from '../Images/burger.jpg';
import './Home.css';

export default function Homepage() {
    return (
        <div className="home-body">
            <div className="text-column">
                <HeaderH1 className="home-title" text="Ronnie's Burger Bar" />

                <div className="details-body">
                    <div className="details-column">
                        <MultiLineText
                            text={'OPENING\nDETAILS'}
                            sectionClassName="details-header-row"
                            textClassName="details-header"
                        />
                        <MultiLineText
                            text={'SUN - THURS  \n 11:30AM - 9PM'}
                            sectionClassName="details-text-row"
                            textClassName="details-text"
                        />
                        <MultiLineText
                            text={'FRI & SAT \n 11.30AM - 10.30PM'}
                            sectionClassName="details-text-row"
                            textClassName="details-text"
                        />
                    </div>

                    <div className="details-column">
                        <MultiLineText
                            text={'LOCATION & \nCONTACT DETAILS'}
                            sectionClassName="details-header-row"
                            textClassName="details-header"
                        />
                        <MultiLineText
                            text={'70 Regent St, \nCheltenham GL50 1HA'}
                            sectionClassName="details-text-row"
                            textClassName="details-text"
                        />
                        <ExternalLink
                            text="Open on Google Maps"
                            className="google-maps-link-home"
                        />

                        <p className="phone-number-row"> 01242 778634 </p>
                    </div>
                </div>
            </div>

            <div className="image-column">
                <img
                    src={Burger}
                    alt="Burger and Beer"
                    className="burger-image"
                    data-testid="burger-image"
                />
            </div>
        </div>
    );
}
