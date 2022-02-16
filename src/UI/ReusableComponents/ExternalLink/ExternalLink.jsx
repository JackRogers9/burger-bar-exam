import './ExternalLink.css';

const url =
    'https://www.google.co.uk/maps/place/70+Regent+St,+Cheltenham+GL50+1HA/@51.9003958,-2.0767852,17z/data=!3m1!4b1!4m5!3m4!1s0x48711b9708de4501:0x822d744420fcb1ca!8m2!3d51.9003925!4d-2.0745965';

export default function ExternalLink({ text, className }) {
    return (
        <a href={url} target="_blank" className={className} rel="noopener noreferrer">
            {text}
        </a>
    );
}
