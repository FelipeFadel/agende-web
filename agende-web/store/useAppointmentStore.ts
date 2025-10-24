import MOCK_DATA from "@/mocks/MOCK_DATA.json";
import { create } from "zustand";

interface Appointment {
  id: string;
  time: string;
  service: string;
  client: string;
}

interface DayData {
  date: string;
  appointments: Appointment[];
}

interface AppointmentStore {
  data: DayData[];
  doneItems: string[];

  addAppointment: (day: string, appointment: Appointment) => void;
  removeAppointment: (date: string, id: string) => void; // ✅ novo
  editAppointment: (date: string, updated: Appointment) => void; // ✅ novo
  toggleDone: (id: string) => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  data: MOCK_DATA.map((d) => ({
    ...d,
    appointments: d.appointments.map((a) => ({ ...a, id: String(a.id) })),
  })),
  doneItems: [],

  addAppointment: (day, appointment) =>
    set((state) => {
      const newData = [...state.data];
      const index = newData.findIndex((d) => d.date === day);

      if (index !== -1) {
        newData[index] = {
          ...newData[index],
          appointments: [...newData[index].appointments, appointment],
        };
      } else {
        newData.push({ date: day, appointments: [appointment] });
      }

      return { data: newData };
    }),

  removeAppointment: (date, id) =>
    set((state) => ({
      data: state.data.map((d) =>
        d.date === date
          ? { ...d, appointments: d.appointments.filter((a) => a.id !== id) }
          : d
      ),
    })),

  editAppointment: (date, updated) =>
    set((state) => ({
      data: state.data.map((d) =>
        d.date === date
          ? {
              ...d,
              appointments: d.appointments.map((a) =>
                a.id === updated.id ? { ...a, ...updated } : a
              ),
            }
          : d
      ),
    })),

  toggleDone: (id) =>
    set((state) => {
      const alreadyDone = state.doneItems.includes(id);
      return {
        doneItems: alreadyDone
          ? state.doneItems.filter((i) => i !== id)
          : [...state.doneItems, id],
      };
    }),
}));
