import { create } from "zustand";
import { RRule } from "rrule";

export type ProcessedEvent = {
  event_id: number | string;
  title: string;
  subtitle?: string;
  start: Date;
  end: Date;
  disabled?: boolean;
  recurring: RRule;
  color?: string;
  textColor?: string;
  editable?: boolean;
  deletable?: boolean;
  draggable?: boolean;
  allDay?: boolean;
  agendaAvatar?: React.ReactElement | string;
  sx?: any;
};

interface EventStore {
  events: ProcessedEvent[];
  addEvent: (event: ProcessedEvent) => void;
  updateEvent: (event: ProcessedEvent) => void;
  deleteEvent: (eventId: number | string) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.event_id === updatedEvent.event_id ? updatedEvent : event
      ),
    })),

  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.event_id !== eventId),
    })),
}));
