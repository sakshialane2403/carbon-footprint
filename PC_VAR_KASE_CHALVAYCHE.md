# PC वर CarbonTrack कसे चालवायचे

तुमच्या laptop वर **दोन गोष्टी** लागतात: **PostgreSQL + Spring Boot (9090)** आणि **React Vite (5173/5174)**.  
Arena preview चा Node API फक्त sandbox साठी आहे. PC वर **STS Spring** चालवा.

---

## 1) आधी हे तपासा (बहुतेक error इथे)

| Check | कसे |
|---|---|
| Java 17 | `java -version` → 17 |
| Node.js | `node -v` → 18+ |
| PostgreSQL चालू आहे का | Services → postgresql |
| Database | `CREATE DATABASE carbon_db;` |
| Password | `application.properties` मधील `postgres` password **तुमच्या** PG password शी match |
| Port 9090 मोकळा | दुसरे Spring/Node बंद करा |
| Port 5173/5174 | जुने `npm run dev` बंद करा |

---

## 2) PostgreSQL

pgAdmin / psql:

```sql
CREATE DATABASE carbon_db;
```

`application.properties` (STS project):

```
server.port=9090
spring.datasource.url=jdbc:postgresql://localhost:5432/carbon_db
spring.datasource.username=postgres
spring.datasource.password=तुमचा_PASSWORD
jwt.secret=carbon-footprint-jwt-secret-key-change-me-32chars
```

**पहिल्यांदा** `spring.jpa.hibernate.ddl-auto=create`  
App एकदा यशस्वी start झाल्यावर **`update`** करा — नाहीतर दर restart ला DB wipe होते.

---

## 3) Backend — STS

1. STS 5 मध्ये **Group_1_Backend** / `spring-backend` project open करा.
2. `CarbonFootprintApplication` Run.
3. Console मध्ये error नसेल तर: `http://localhost:9090`

Admin seed: **admin / Admin@123**

Spring start न झाल्यास साधारण कारणे:
- PostgreSQL बंद / चुकीचा password → `Connection refused` / `password authentication failed`
- Port 9090 already in use
- JWT secret 32 characters पेक्षा कमी
- Java 17 नसणे

---

## 4) Frontend

PowerShell:

```bat
cd "C:\Internship\carbon foot print\Web-Platform-for-Carbon-Footprint-Monitoring-and-Sustainability-Analytics-July-2026\Group_1_Frontend"
```

(तुमचा खरा folder वेगळा असेल तर तोच `cd`)

```bat
npm install
npm run dev
```

Browser: `http://localhost:5173` किंवा `5174`

`vite.config.js` मध्ये हे हवं:

```js
server: {
  port: 5173,
  proxy: {
    "/api": { target: "http://127.0.0.1:9090", changeOrigin: true }
  }
}
```

Frontend चालतो पण login fail:
- Spring **9090** वर नाही → Network tab मध्ये `/api/auth/login` 502
- चुकीचा URL (`/users/login` नको, **`/api/auth/login`**)

---

## 5) Login

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| User | sakshi | User@123 |

नवा register = **PENDING**. Admin → Users → **Approve** नंतरच login.

---

## 6) Spring नसेल तर तात्पुरता Node API (optional)

फक्त UI दाखवायचं असेल:

```bat
cd backend
npm install
node server.js
```

हे **9090** वर येईल. मग Vite चालवा.  
**Sir demo / final** साठी Spring + `carbon_db`च वापरा.

---

## 7) मला error पाठवा तर exact सांगता येईल

STS Console मधील **लाल exception** ची पहिली 15 ओळी  
किंवा frontend terminal मधील error  
किंवा browser F12 → Network → `/api/auth/login` चा status.

सामान्य messages:
- `Connection to localhost:5432 refused` → PostgreSQL start करा
- `FATAL: password authentication failed` → properties मधील password बदला
- `Port 9090 was already in use` → जुने Java process Task Manager मधून End
- `ECONNREFUSED 127.0.0.1:9090` → आधी Spring चालवा, मग Vite
