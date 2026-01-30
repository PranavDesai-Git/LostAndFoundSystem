# Lost-and-Found-System

A full-stack implementation for asset tracking and secure recovery. The system utilizes unique QR/Keyword mappings to link physical items to digital ownership records, featuring a verified handover protocol via OTP.

## Tech Stack

- **Backend:** Java / Spring Boot
- **Security:** Spring Security (Auth & Authorization)
- **Database:** MySQL
- **Frontend:** React.js
- **API Client:** Axios

## Core Logic & Modules

* **QR/Keyword Management:** Logic for generating and mapping unique identifiers to user assets.
* **The "Found Box":** A filtered search engine for items reported without a direct QR scan.
* **Verification Protocol:** Implements a 'Found Code' OTP. The system generates a transient token upon a successful match, which the finder must verify to close the lifecycle of a lost item.
* **Persistence Layer:** Relational schema in MySQL managing users, item states (owned/lost/found), and messaging logs.

## Current Implementation Status

### Backend (Spring Boot)
- [ ] REST API endpoints for User Auth and Profile management.
- [ ] MySQL schema initialization and Entity mapping for Items.
- [ ] Spring Security configuration and dependency injection setup.
- [ ] Default route controllers.

### Frontend (React)
- [ ] Authentication flow (Login/Signup UI).
- [ ] User Dashboard (View/Manage owned assets).
- [ ] Axios integration for backend consumption.

### Pending
- [ ] QR generation service integration.
- [ ] Found Box filtering logic.
- [ ] In-app messaging WebSocket/Polling implementation.
- [ ] OTP generation and validation service.

## API Usage
The backend exposes RESTful endpoints for item state management and user interactions. Detailed API documentation to follow as the reporting module is finalized.

## Development Team
- **Pranav Desai** (Lead)
- **Srikar Peri**
- **Saiansh Sahoo**