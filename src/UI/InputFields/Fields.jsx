import { HeaderH4 } from '../ReusableComponents/Headers/Headers';
import './Fields.css';

export default function Fields({ fieldInformation }) {
    return fieldInformation.map(({ label, placeholder, id, className, dataTestId, onChange }) => (
        <div className="field-body" key={id}>
            <HeaderH4 className={className} text={label} />

            <input
                id={id}
                required
                onChange={onChange}
                placeholder={placeholder}
                data-testid={dataTestId}
                type={label === 'Password' ? 'password' : ''}
                className="field-input"
            />
        </div>
    ));
}
