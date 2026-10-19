export const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const seedCategories = [
  { id: "c1", name: "Transport", code: "TRN", description: "Travel and commuting", status: "Active" },
  { id: "c2", name: "Food", code: "FOOD", description: "Meals and diet", status: "Active" },
  { id: "c3", name: "Electricity", code: "ELC", description: "Power consumption", status: "Active" },
  { id: "c4", name: "Shopping", code: "SHP", description: "Purchases and goods", status: "Active" },
  { id: "c5", name: "Waste", code: "WST", description: "Household waste", status: "Active" },
  { id: "c6", name: "Water Usage", code: "WTR", description: "Water consumption", status: "Active" },
];

export const seedTypes = [
  { id: "t1", categoryId: "c1", name: "Car", code: "CAR", unit: "km", min: 0, max: 2000, description: "Private car travel", status: "Active", created: "2026-07-01" },
  { id: "t2", categoryId: "c1", name: "Bus", code: "BUS", unit: "km", min: 0, max: 500, description: "Public bus", status: "Active", created: "2026-07-01" },
  { id: "t3", categoryId: "c1", name: "Bike", code: "BIK", unit: "km", min: 0, max: 300, description: "Two-wheeler", status: "Active", created: "2026-07-01" },
  { id: "t4", categoryId: "c1", name: "Ship", code: "SHP", unit: "km", min: 0, max: 5000, description: "Marine travel", status: "Active", created: "2026-07-01" },
  { id: "t5", categoryId: "c1", name: "Boat", code: "BOT", unit: "km", min: 0, max: 200, description: "Small boat", status: "Active", created: "2026-07-01" },
  { id: "t6", categoryId: "c1", name: "Train", code: "TRN", unit: "km", min: 0, max: 3000, description: "Rail travel", status: "Active", created: "2026-07-01" },
  { id: "t7", categoryId: "c2", name: "Veg Meal", code: "VEG", unit: "meal", min: 1, max: 10, description: "Vegetarian meal", status: "Active", created: "2026-07-02" },
  { id: "t8", categoryId: "c2", name: "Chicken Meal", code: "CHK", unit: "meal", min: 1, max: 10, description: "Chicken meal", status: "Active", created: "2026-07-02" },
  { id: "t9", categoryId: "c3", name: "Home Electricity", code: "HEL", unit: "kWh", min: 0, max: 500, description: "Household power", status: "Active", created: "2026-07-02" },
  { id: "t10", categoryId: "c4", name: "Online Shopping", code: "ONL", unit: "order", min: 1, max: 20, description: "E-commerce order", status: "Active", created: "2026-07-03" },
  { id: "t11", categoryId: "c5", name: "Household Waste", code: "HWS", unit: "kg", min: 0, max: 100, description: "General waste", status: "Active", created: "2026-07-03" },
  { id: "t12", categoryId: "c6", name: "Tap Water", code: "TAP", unit: "litre", min: 0, max: 2000, description: "Domestic water", status: "Active", created: "2026-07-03" },
];

export const seedFactors = [
  { id: "f1", typeId: "t1", factor: 0.21, unit: "kg CO₂/km", source: "DEFRA", version: "2025", from: "2026-01-01", to: "", remarks: "Petrol car avg", createdBy: "Admin", status: "Active" },
  { id: "f2", typeId: "t2", factor: 0.089, unit: "kg CO₂/km", source: "DEFRA", version: "2025", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f3", typeId: "t3", factor: 0.103, unit: "kg CO₂/km", source: "DEFRA", version: "2025", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f4", typeId: "t4", factor: 0.3, unit: "kg CO₂/km", source: "IMO", version: "2024", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f5", typeId: "t5", factor: 0.18, unit: "kg CO₂/km", source: "Estimate", version: "1.0", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f6", typeId: "t6", factor: 0.041, unit: "kg CO₂/km", source: "DEFRA", version: "2025", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f7", typeId: "t7", factor: 1.5, unit: "kg CO₂/meal", source: "OWID", version: "2024", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f8", typeId: "t8", factor: 3.2, unit: "kg CO₂/meal", source: "OWID", version: "2024", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f9", typeId: "t9", factor: 0.82, unit: "kg CO₂/kWh", source: "CEA India", version: "2025", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f10", typeId: "t10", factor: 0.5, unit: "kg CO₂/order", source: "Estimate", version: "1.0", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f11", typeId: "t11", factor: 0.45, unit: "kg CO₂/kg", source: "IPCC", version: "AR6", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
  { id: "f12", typeId: "t12", factor: 0.0003, unit: "kg CO₂/litre", source: "Estimate", version: "1.0", from: "2026-01-01", to: "", remarks: "", createdBy: "Admin", status: "Active" },
];

export const seedUsers = [
  { id: 1, firstName: "Sakshi", lastName: "Alane", email: "sakshi@example.com", date: "2026-08-10", status: "APPROVED", activities: 8, carbon: 24.6, reason: "" },
  { id: 2, firstName: "Rahul", lastName: "Patil", email: "rahul@example.com", date: "2026-08-12", status: "PENDING", activities: 0, carbon: 0, reason: "" },
  { id: 3, firstName: "Priya", lastName: "Sharma", email: "priya@example.com", date: "2026-08-08", status: "APPROVED", activities: 15, carbon: 41.2, reason: "" },
  { id: 4, firstName: "Amit", lastName: "Joshi", email: "amit@example.com", date: "2026-08-05", status: "REJECTED", activities: 0, carbon: 0, reason: "Incomplete ID proof", rejected: "2026-08-06" },
  { id: 5, firstName: "Neha", lastName: "Kulkarni", email: "neha@example.com", date: "2026-08-14", status: "PENDING", activities: 0, carbon: 0, reason: "" },
];

export const seedLogs = [
  { id: "l1", categoryId: "c1", typeId: "t1", value: 20, emission: 4.2, date: "2026-08-11", details: "Office commute" },
  { id: "l2", categoryId: "c3", typeId: "t9", value: 12, emission: 9.84, date: "2026-08-10", details: "Home usage" },
];
