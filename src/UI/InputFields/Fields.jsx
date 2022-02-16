import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

import { HeaderH4 } from '../ReusableComponents/Headers/Headers';
import './Fields.css';

export default function Fields({ fieldInformation }) {
    const [startDate, setStartDate] = useState(new Date());

    return fieldInformation.map(({ label, placeholder, id, className }) => (
        <div className="field-body" key={id}>
            <HeaderH4 className={className} text={label} />

            {id === 'dob' ? (
                <DatePicker
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    className="field-input-date"
                    onChange={(date) => setStartDate(date)}
                />
            ) : (
                <input placeholder={placeholder} className="field-input" id={id} required />
            )}
        </div>
    ));
}
