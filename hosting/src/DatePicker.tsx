import React, { useRef, useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./Firebase.tsx";
import { getUserGroups, getUserDates } from "./UserUtils.tsx"; // Make sure the path is correct
import { getDatabase, ref, update, get, child } from "firebase/database";

function DatePicker() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [defaultDates, setDefaultDates] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const calendarRef = useRef(null);

  useEffect(() => {
          const fetchUserDates = async () => {
                  try {
                       const userDatesData = await getUserDates(auth.currentUser.uid);
                       setDefaultDates(userDatesData);
                       console.log("User dates: ", userDatesData);
                      } catch (error) {
                              console.error("Error fetching user dates: ", error);
                          }
              };
      }, []);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const userGroupsData = await getUserGroups(auth.currentUser.uid);
        setUserGroups(userGroupsData);
        console.log("User groups: ", userGroupsData);
      } catch (error) {
        console.error("Error fetching user groups: ", error);
      }
    };
    fetchUserGroups();
  }, []);

const handleDateChange = (dates) => {
  const db = getDatabase();
  const updates = {};

  const set1 = new Set(dates);
  const set2 = new Set(selectedDates);
  console.log("Set1: ", set1);
  console.log("Set2: ", set2);

  if (set1.size < set2.size) {
    const removedDates = [...selectedDates].filter((date) => !set1.has(date));
    console.log("Removed dates: ", removedDates);

    removedDates.forEach((date) => {
      userGroups.forEach((group) => {
        const dateOnly = new Date(date).toISOString().slice(0, 10);
        const userRef = `groups/${group}/dates/${dateOnly}/${auth.currentUser.displayName}`;
        updates[userRef] = false;
      });
    });
  } else {
    console.log("No dates removed");
  }

  userGroups.forEach((group) => {
    console.log("Group: ", group);
    dates.forEach((date) => {
      const dateOnly = new Date(date).toISOString().slice(0, 10);
      const groupRef = `groups/${group}/dates/${dateOnly}`;
      console.log("Group ref: ", groupRef);
      const userRef = `groups/${group}/dates/${dateOnly}/${auth.currentUser.displayName}`;
      if (!selectedDates.includes(date)) {
        // If the date is added, add the user to availableUsers
        updates[userRef] = true;
      } else if (!dates.includes(date)) {
        // If the date is removed, remove the user from availableUsers
        updates[userRef] = null;
      }
    });
  });

  setSelectedDates([...dates]); // Update the state with the new dates
  update(ref(db), updates);
  // Update the 'dates' field for the current user separately
  update(ref(db, `users/${auth.currentUser.uid}`), { dates: dates });
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
            locale: { firstDayOfWeek: 1 },
            defaultDate: defaultDates,
            onClose: (dates) => handleDateChange(dates),
          }}
        />
      </div>
    </div>
  );
}

export default DatePicker;

