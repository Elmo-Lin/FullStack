# FullStack

> 這是一個包含前端跟後端的小型專案

---

## 目錄

1. [前置需求](#前置需求)
2. [安裝](#安裝)
3. [設定](#設定)
4. [執行應用程式](#執行應用程式)

   * [後端](#後端)
   * [前端](#前端)
5. [資料夾結構](#資料夾結構)
6. [參與貢獻](#參與貢獻)

---

## 前置需求

* **Node.js** ≥ v20.19.0
* **npm**
* **Java** ≥ 23

## 安裝

### 1. Clone 專案

```bash
git clone https://github.com/Elmo-Lin/FullStack.git
cd FullStack
```

### 2. 安裝 dependency

#### 後端

```bash
cd backend
mvn clean install
```

#### 前端

```bash
cd frontend
npm install
```

#### 資料庫

```bash
docker-compose up -d
```

## 設定

1. 設定請在後端的 src/main/resources/application.properties 中進行，範例如下：

   ```dotenv
    # 是否啟用安全驗證（true：啟用，false：全部允許）
    app.security.enabled=true

    # 是否啟用 SSO Filter（true：使用 SSO，false：使用 OAuth2 Login）
    app.security.sso-filter=false

    # SSO Filter（僅在啟用 SSO Filter 時生效）：
    # token    → 無狀態模式（SessionCreationPolicy.STATELESS）
    # session  → 有狀態模式（SessionCreationPolicy.IF_REQUIRED）
    auth.method=token

    # OAuth2 設定示例 (當 app.security.sso-filter=false 時生效)
    spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
    spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
   ```

## 執行應用程式

### 後端

```bash
cd backend
mvn spring-boot:run
```

### 前端

```bash
cd frontend
npm start
```

之後可透過瀏覽器訪問：

* 後端 API: `http://localhost:9090`
* 前端 UI: `http://localhost:3000`

## 參與貢獻

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/<feature name>`)
3. 提交更改 (`git commit -m "feat: add <feature name>"`)
4. 推送分支 (`git push origin feature/<feature name>`)
5. 開啟 Pull Request
