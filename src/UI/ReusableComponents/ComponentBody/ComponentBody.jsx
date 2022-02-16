import { HeaderH1, HeaderSeperator } from '../Headers/Headers';
import './ComponentBody.css';

export default function ComponentBody({ children, header }) {
    return (
        <div className="component-body">
            <HeaderH1 text={header} className="page-header" />

            <HeaderSeperator />

            {children}
        </div>
    );
}
