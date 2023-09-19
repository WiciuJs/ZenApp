import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";


const localizer = momentLocalizer(moment);

const MyCalendar = (props: { events: Event[] }) => {
 

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        views={["week"]}
        defaultDate={new Date()}
        defaultView="week"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
