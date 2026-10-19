# CarbonTrack Spring Backend (complete)

Port **9090**. PostgreSQL database **carbon_db**.

## Run (STS / Maven)
1. Create DB: `CREATE DATABASE carbon_db;`
2. Set `src/main/resources/application.properties` user/password
3. Run `CarbonFootprintApplication`
4. First start uses `ddl-auto=create` (wipes tables). After first success, change to `update`.

Default admin: **admin** / **Admin@123**

## What is included
- JWT login (username **or** email **or** mobile)
- Register → status **PENDING** + registration email
- Admin approve/reject + approval email
- Activities: emission = quantity × factor
- Dashboard summary, recommendations, goals
- Articles, chatbot FAQs, category limits
- Master data: categories, activity types, emission factors (seeded)
- Reports `/api/reports/monthly?userId=`

## Frontend
Vite proxy `/api` → `http://localhost:9090`

JWT secret must be ≥ 32 characters (already set).
