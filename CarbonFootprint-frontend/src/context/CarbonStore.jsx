import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedCategories, seedFactors, seedLogs, seedTypes, seedUsers, uid } from "../data/seedCarbon";

const KEY = "carbontrack_admin_v1";
const Ctx = createContext(null);

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { categories: seedCategories, types: seedTypes, factors: seedFactors, users: seedUsers, logs: seedLogs };
};

export function CarbonStoreProvider({ children }) {
  const [state, setState] = useState(load);
  const [toast, setToast] = useState("");

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);

  const notify = (m) => { setToast(m); setTimeout(() => setToast(""), 2400); };

  const factorFor = (typeId) => {
    const f = state.factors.find((x) => x.typeId === typeId && x.status === "Active");
    return f ? Number(f.factor) : 0;
  };

  const logActivity = ({ categoryId, typeId, value, details, date }) => {
    const type = state.types.find((t) => t.id === typeId);
    const emission = Number((Number(value) * factorFor(typeId)).toFixed(2));
    const log = {
      id: uid(),
      categoryId,
      typeId,
      value: Number(value),
      unit: type?.unit || "",
      factor: factorFor(typeId),
      emission,
      date: date || new Date().toISOString().slice(0, 10),
      details: details || "",
    };
    setState((s) => ({ ...s, logs: [log, ...s.logs] }));
    notify(`Saved ${emission} kg CO₂e`);
    return log;
  };

  const updateLog = (id, patch) => {
    setState((s) => ({
      ...s,
      logs: s.logs.map((l) => {
        if (l.id !== id) return l;
        const typeId = patch.typeId || l.typeId;
        const value = patch.value != null ? Number(patch.value) : l.value;
        const factor = factorFor(typeId);
        return { ...l, ...patch, value, factor, emission: Number((value * factor).toFixed(2)) };
      }),
    }));
    notify("Activity updated");
  };

  const deleteLog = (id) => {
    setState((s) => ({ ...s, logs: s.logs.filter((l) => l.id !== id) }));
    notify("Activity deleted");
  };

  const deleteCategory = (id) => {
    setState((s) => ({
      ...s,
      categories: s.categories.filter((c) => c.id !== id),
      types: s.types.filter((t) => t.categoryId !== id),
    }));
    notify("Category deleted");
  };

  const deleteType = (id) => {
    setState((s) => ({ ...s, types: s.types.filter((t) => t.id !== id) }));
    notify("Activity type deleted");
  };

  const addCategory = (c) => { setState((s) => ({ ...s, categories: [...s.categories, { ...c, id: uid(), status: c.status || "Active" }] })); notify("Category added"); };
  const updateCategory = (id, patch) => setState((s) => ({ ...s, categories: s.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  const addType = (t) => { setState((s) => ({ ...s, types: [...s.types, { ...t, id: uid(), created: new Date().toISOString().slice(0, 10), status: t.status || "Active" }] })); notify("Activity type added"); };
  const updateType = (id, patch) => setState((s) => ({ ...s, types: s.types.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  const addFactor = (f) => { setState((s) => ({ ...s, factors: [...s.factors, { ...f, id: uid(), createdBy: "Admin", factor: Number(f.factor) }] })); notify("Emission factor created"); };
  const updateFactor = (id, patch) => setState((s) => ({ ...s, factors: s.factors.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
  const deleteFactor = (id) => { setState((s) => ({ ...s, factors: s.factors.filter((f) => f.id !== id) })); notify("Factor deleted"); };

  const setUserStatus = (id, status, reason = "") => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) =>
        u.id === id ? { ...u, status, reason, rejected: status === "REJECTED" ? new Date().toISOString().slice(0, 10) : u.rejected } : u
      ),
    }));
    notify(status === "APPROVED" ? "User approved" : status === "REJECTED" ? "User rejected" : "User updated");
  };

  const addPendingUser = (u) => {
    setState((s) => ({
      ...s,
      users: [...s.users, { id: Date.now(), status: "PENDING", activities: 0, carbon: 0, date: new Date().toISOString().slice(0, 10), reason: "", ...u }],
    }));
  };

  const resetDemo = () => {
    const next = { categories: seedCategories, types: seedTypes, factors: seedFactors, users: seedUsers, logs: seedLogs };
    setState(next);
    notify("Demo data reset");
  };

  const stats = useMemo(() => {
    const carbon = state.logs.reduce((a, l) => a + Number(l.emission), 0);
    return {
      totalUsers: state.users.length,
      pending: state.users.filter((u) => u.status === "PENDING").length,
      approved: state.users.filter((u) => u.status === "APPROVED").length,
      rejected: state.users.filter((u) => u.status === "REJECTED").length,
      carbon: Number(carbon.toFixed(2)),
      activities: state.logs.length,
    };
  }, [state]);

  return (
    <Ctx.Provider
      value={{
        ...state, stats, toast, factorFor, logActivity, updateLog, deleteLog,
        addCategory, updateCategory, deleteCategory, addType, updateType, deleteType,
        addFactor, updateFactor, deleteFactor, setUserStatus, addPendingUser, resetDemo,
      }}
    >
      {children}
      {toast && (
        <div style={{ position: "fixed", right: 20, bottom: 20, background: "#14532d", color: "#fff", padding: "12px 16px", borderRadius: 12, zIndex: 80 }}>
          {toast}
        </div>
      )}
    </Ctx.Provider>
  );
}

export const useCarbon = () => useContext(Ctx);
