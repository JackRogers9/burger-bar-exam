import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

import { HeaderH4 } from '../ReusableComponents/Headers/Headers';
import './Fields.css';

export default function Fields({ fieldInformation }) {
    const [startDate, setStartDate] = useState(new Date());

    return fieldInformation.map(({ label, placeholder, id, className, dataTestId }) => (
        <div className="field-body" key={id}>
            <HeaderH4 className={className} text={label} />

            {id === 'dob' ? (
                <DatePicker
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    dateFormatCalendar="MMMM"
                    className="field-input-date"
                    onChange={(date) => setStartDate(date)}
                />
            ) : (
                <input
                    id={id}
                    required
                    placeholder={placeholder}
                    data-testid={dataTestId}
                    className="field-input"
                />
            )}
        </div>
    ));
}
