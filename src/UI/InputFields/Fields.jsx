import './Fields.css';

export default function Fields({ fieldInformation }) {
    return fieldInformation.map((field) => {
        const { label, placeholder, id } = field;

        return (
            <div className="field-body" key={id}>
                <h4 className="field-label"> {label} </h4>
                <input placeholder={placeholder} className="field-input" id={id} required />
            </div>
        );
    });
}
