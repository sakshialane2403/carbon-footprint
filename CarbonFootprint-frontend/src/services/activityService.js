import api from "./api.js";
import { currentUserId } from "./session.js";

const normalize = (a) => ({
  id: a.id ?? a.activityLogId,
  activityName: a.activityName || a.activity,
  category: a.category,
  quantity: a.quantity ?? a.value,
  unit: a.unit || "",
  emission: a.emission ?? a.totalEmission ?? 0,
  date: a.date || a.activityDate,
  note: a.note || a.notes || "",
  factor: a.factor ?? a.emissionFactor,
});

export async function listActivities() {
  const userId = currentUserId();
  if (!userId) return [];
  const { data } = await api.get("/activities", { params: { userId } });
  return (Array.isArray(data) ? data : []).map(normalize);
}

export async function addActivity(payload) {
  const userId = currentUserId();
  if (!userId) throw new Error("Please login again.");
  const { data } = await api.post("/activities", payload, { params: { userId } });
  return normalize(data);
}

export async function deleteActivity(id) {
  const userId = currentUserId();
  await api.delete(`/activities/${id}`, { params: { userId } });
}

export async function dashboardSummary() {
  const userId = currentUserId();
  const { data } = await api.get("/dashboard/summary", { params: { userId } });
  return {
    totalEmissions: data.totalEmissions ?? data.totalEmission ?? 0,
    activityCount: data.activityCount ?? data.totalActivities ?? 0,
    ecoScore: data.ecoScore ?? 80,
    goalKg: data.goalKg ?? 100,
    byCategory: data.byCategory || [],
  };
}

export async function recommendations() {
  const userId = currentUserId();
  const { data } = await api.get("/recommendations", { params: { userId } });
  return data || { topActivities: [], alerts: [] };
}
