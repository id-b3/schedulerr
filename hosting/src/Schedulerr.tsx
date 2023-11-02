import "./Schedulerr.css";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const today = new Date();

function Schedulerr() {

    function shiftDate(date, numDays){
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

    return (
        <CalendarHeatmap
            startDate = { today }
            endDate = { shiftDate(today, 28) }
            values = { [
                { date: '2023-11-03', count: 1 },
                { date: '2023-11-14', count: 2 },
                { date: '2023-11-16', count: 3 },
            ] }
            showWeekdayLabels = { true }
            showMonthLabels = { false }
            horizontal = { false }
            onClick={value => alert(`Players Available: ${value.count}`)}
            classForValue={(value) => {
                if (!value) {
                    return 'color-empty';
                }
                    return `color-scale-${value.count}`;
            }}
        />
    );
}

export default Schedulerr
