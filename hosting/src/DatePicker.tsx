import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./Firebase.tsx";
import { getDatabase, ref, update } from "firebase/database";

function DatePicker() {
  const [selectedDates, setSelectedDates] = useState([]);

  const calendarRef = useRef(null);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    const db = getDatabase();
    update(ref(db, 'users/' + auth.currentUser.uid + '/'), {
            dates: dates,
        });
  };

  return (
    <div className="row justify-content-center">
        <h3 className="text-center">👇 Change Availability 👇</h3>
        <div className="col-md-6 text-center">
            <Flatpickr
              ref={calendarRef}
              options={{
                mode: "multiple",
                dateFormat: "Y-m-d",
                minDate: "today",
                "locale": {"firstDayOfWeek": 1},
                onClose: (dates) => handleDateChange(dates),
              }}
            />
        </div>
    </div>
  );
}

export default DatePicker;
