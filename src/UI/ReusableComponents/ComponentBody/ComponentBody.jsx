import { HeaderH1 } from '../Headers';

export default function ComponentBody({ children, header }) {
    return (
        <div className="component-body">
            <HeaderH1 text={header} className="page-header" />

            {children}
        </div>
    );
}
