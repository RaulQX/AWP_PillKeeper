import { Scheduler } from "@aldabil/react-scheduler";
import { useEventStore } from "../../stores/eventStore";
import {
  DayHours,
  EventActions,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNotificationStore } from "../../stores/notificationStore";
import { notificationsToProcessedEvents } from "../../utils/notificationTransforms";
import { getRandomColor } from "../../utils/colors";
import { useNotifications } from "../../hooks/useNotifications";

const Calendar = () => {
  const { data: notifsQuery } = useNotifications();
  const notifications = useNotificationStore(() => notifsQuery);
  console.log("notifsQuery =", notifsQuery);
  console.log("notifications =", notifications);
  const processedEvents = notificationsToProcessedEvents(notifications || []);
  console.log("processedEvents =", processedEvents);

  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: async (event: ProcessedEvent) => {
      console.log("event =", event);
      const response = await axios.post(
        "https://localhost:7001/api/Notifications",
        {
          id: 1,
          title: event.title,
          subtitle: event.subtitle || null,
          //add two hours to date
          date: new Date(event.start.getTime() + 2 * 60 * 60 * 1000),
          userId: 1,
          taken: false,
          color: getRandomColor(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response.data;
    },
  });

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    if (action === "edit") {
    } else if (action === "create") {
      await createEventMutation.mutateAsync(event);
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      return event;
    }
    return event;
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
        events={processedEvents}
        editable={true}
        draggable={true}
        onEventEdit={(event: any) => {
          useEventStore.getState().updateEvent(event);
        }}
        onConfirm={handleConfirm}
        week={{
          weekDays: [2, 3, 4, 5, 6, 0, 1],
          weekStartOn: 0,
          startHour: 0,
          endHour: 23,
          step: 30,
        }}
        day={{
          startHour: 7 as DayHours,
          endHour: 23,
          step: 60,
        }}
      />
    </div>
  );
};

export default Calendar;
