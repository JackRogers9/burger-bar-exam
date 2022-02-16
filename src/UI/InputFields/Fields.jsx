import './Fields.css';

export default function Fields({ fieldInformation }) {
    return fieldInformation.map(({ label, placeholder, id }) => (
        <div className="field-body" key={id}>
            <h4 className="field-label"> {label} </h4>
            <input placeholder={placeholder} className="field-input" id={id} required />
        </div>
    ));
}
