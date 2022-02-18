import './Headers.css';

export const HeaderH1 = ({ className, text }) => <h1 className={className}> {text} </h1>;

export const HeaderH2 = ({ className, text }) => <h2 className={className}> {text} </h2>;

export const HeaderH3 = ({ className, text, dataTestId }) => (
    <h3 className={className} data-testid={dataTestId}>
        {text}
    </h3>
);

export const HeaderH4 = ({ className, text }) => <h4 className={className}> {text} </h4>;

export const HeaderSeperator = () => <div className="seperator" />;

export const methodAndHeaders = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};
