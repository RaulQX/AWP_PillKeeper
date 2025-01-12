import { useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useEventStore } from "../../stores/eventStore";
import { DayHours } from "@aldabil/react-scheduler/types";

const Calendar = () => {
  const events = useEventStore((state) => state.events);
  const todaysMeds = [
    { name: "Paracetamol", time: new Date().setHours(8, 0), taken: false },
    { name: "Vitamin D", time: new Date().setHours(9, 0), taken: true },
    { name: "Iron Supplement", time: new Date().setHours(10, 0), taken: false },
    { name: "Nurofen", time: new Date().setHours(12, 0), taken: false },
    { name: "Vitamin B12", time: new Date().setHours(22, 0), taken: false },
    { name: "Magnesium", time: new Date().setHours(20, 0), taken: false },
  ];

  const tomorrowsMeds = [
    { name: "Paracetamol", time: new Date().setHours(8, 0), taken: false },
    { name: "Vitamin D", time: new Date().setHours(9, 0), taken: false },
    { name: "Iron Supplement", time: new Date().setHours(10, 0), taken: false },
    { name: "Nurofen", time: new Date().setHours(12, 0), taken: false },
    { name: "Vitamin B12", time: new Date().setHours(14, 0), taken: false },
    { name: "Magnesium", time: new Date().setHours(20, 0), taken: false },
  ];
  useEffect(() => {
    const addEvent = useEventStore.getState().addEvent;

    // Clear existing events
    useEventStore.getState().events.forEach((event) => {
      useEventStore.getState().deleteEvent(event.event_id);
    });

    // Add events for today's medicines
    todaysMeds.forEach((med, index) => {
      const medTime = new Date(med.time);
      const hours = medTime.getHours();
      const minutes = medTime.getMinutes();

      const start = new Date();
      start.setHours(hours, minutes, 0);
      start.setSeconds(0);
      start.setMilliseconds(0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);

      addEvent({
        event_id: `today-${index}`,
        title: med.name,
        start,
        end,
        color: med.taken ? "#A5D6A7" : "#90CAF9",
        editable: true,
        draggable: true,
      });
    });

    // Add events for tomorrow's medicines
    tomorrowsMeds.forEach((med, index) => {
      const medTime = new Date(med.time);
      const hours = medTime.getHours();
      const minutes = medTime.getMinutes();

      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setHours(hours, minutes, 0);
      start.setSeconds(0);
      start.setMilliseconds(0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);

      addEvent({
        event_id: `tomorrow-${index}`,
        title: med.name,
        start,
        end,
        color: "#90CAF9",
        editable: true,
        draggable: true,
      });
    });
  }, []);

  const getEarliestEventHour = () => {
    const today = new Date();
    const todayEvents = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === today.toDateString();
    });
    if (todayEvents.length === 0) return 12; // Default to 7 if no events

    const earliestHour = Math.min(
      ...todayEvents.map((event) => new Date(event.start).getHours())
    );

    return Math.max(earliestHour - 1, 0); // Show 1 hour before earliest event, but not before midnight
  };

  return (
    <div
      style={{
        width: window.innerWidth < 768 ? "100%" : "80%",
        marginBottom: window.innerWidth < 768 ? "16px" : 0,
        height: window.innerWidth < 768 ? "100%" : "calc(100vh - 128px)",
        overflow: "scroll",
        overflowX: "hidden",
      }}
    >
      <Scheduler
        view="day"
        events={events}
        editable={true}
        draggable={true}
        onEventEdit={(event: any) => {
          console.log(events);
          useEventStore.getState().updateEvent(event);
        }}
        week={{
          weekDays: [2, 3, 4, 5, 6, 0, 1],
          weekStartOn: 0,
          startHour: 0,
          endHour: 23,
          step: 30,
        }}
        day={{
          startHour: getEarliestEventHour() as DayHours,
          endHour: 23,
          step: 60,
        }}
      />
    </div>
  );
};

export default Calendar;
