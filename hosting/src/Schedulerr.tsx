import "./Schedulerr.css";
import { auth } from "./Firebase.tsx";
import { useState, useEffect } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Modal, Button } from "react-bootstrap";
import 'react-calendar-heatmap/dist/styles.css';
import { getUserGroups } from "./UserUtils.tsx";
import { getDatabase, get, ref, onValue, off } from "firebase/database";

const today = new Date();

function Schedulerr() {

    const [userGroups, setUserGroups] = useState([]);
      const [selectedGroup, setSelectedGroup] = useState(null);
      const [values, setValues] = useState([]);
      const [players, setPlayers] = useState([]);
          const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({ date: null, players: [] });

    const handleModalOpen = (value) => {
        const clickedData = values.find((data) => data.date === value.date);
        if (clickedData) {
            setModalData({ date: value.date, players: clickedData.users, number: value.count });
            setModalShow(true);
        }
    };

    useEffect(() => {
        const fetchUserGroups = async () => {
          try {
            const userGroupsData = await getUserGroups(auth.currentUser.uid);
            setUserGroups(userGroupsData);
                    if (userGroupsData.length > 0) {
          setSelectedGroup(userGroupsData[0]); // Set the default selected group here
        }
          } catch (error) {
            console.error("Error fetching user groups: ", error);
          }
        };
        fetchUserGroups();
      }, []);

useEffect(() => {
  if (selectedGroup) {
    const groupRef = ref(getDatabase(), 'groups/' + selectedGroup + '/dates');
    console.log("Group ref: ", groupRef);
    const onDataChange = (snapshot) => {
      const dates = snapshot.val();
      if (dates) {
        const availableData = [];
        Object.keys(dates).forEach((date) => {
          const dateEntry = dates[date];
          const availableUsers = [];
          Object.keys(dateEntry).forEach((user) => {
            if (dateEntry[user] === true) {
              availableUsers.push(user);
            }
          });
          availableData.push({ date, users: availableUsers });
          setPlayers(availableData);
        });
        const calculatedValues = calculateValues(availableData);
        setValues(calculatedValues);
      }
    };

    onValue(groupRef, onDataChange);

    return () => off(groupRef, 'value', onDataChange); // Cleanup the listener on unmount
  }
}, [selectedGroup]);

const calculateValues = (availableData) => {
  const values = [];
  availableData.forEach((data) => {
    values.push({ date: data.date, count: data.users.length });
  });
  return values;
};

const handleGroupSelection = (group) => {
  setSelectedGroup(group);
};

    function shiftDate(date, numDays){
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

console.log("Values: ", values);

    return (
    <div>
      {/* Dropdown to choose a group */}
          <DropdownButton id="dropdown-basic-button" title="Select Group to View">
{userGroups.map((group, index) => (
  <Dropdown.Item key={index} onClick={() => handleGroupSelection(group)}>
    {group}
  </Dropdown.Item>
))}
    </DropdownButton>
            <CalendarHeatmap
                startDate={shiftDate(today, -1)}
                endDate={shiftDate(today, 27)}
                values={values}
                showWeekdayLabels={true}
                showMonthLabels={false}
                horizontal={false}
                onClick={handleModalOpen} // Call the function to open the modal
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${value.count}`;
                }}
            />

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Players Availability for {modalData.date}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="text-center">
                        <h5>Available Players: {modalData.number}</h5>
                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Schedulerr
