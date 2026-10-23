import { useState } from "react";

const services = [
  {
    name: "Amazon EC2",
    shortName: "EC2",
    category: "Compute",
    description: "Scalable virtual servers for applications and workloads.",
    icon: "compute",
    color: "blue",
  },
  {
    name: "Amazon S3",
    shortName: "S3",
    category: "Storage",
    description: "Durable object storage for files, backups, and data.",
    icon: "storage",
    color: "green",
  },
  {
    name: "Amazon RDS",
    shortName: "RDS",
    category: "Database",
    description: "Managed relational databases built for dependable operations.",
    icon: "database",
    color: "violet",
  },
  {
    name: "Amazon VPC",
    shortName: "VPC",
    category: "Networking",
    description: "A logically isolated network for your cloud resources.",
    icon: "network",
    color: "orange",
  },
  {
    name: "Amazon CloudWatch",
    shortName: "CW",
    category: "Monitoring",
    description: "Metrics, logs, and alarms for your applications and services.",
    icon: "monitoring",
    color: "pink",
  },
];

function ServiceIcon({ type }) {
  const iconPaths = {
    compute: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M9 9h6v6H9zM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" />
      </>
    ),
    storage: (
      <>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="m10.5 7.6-4 7m7-7 4 7M8 18h8" />
      </>
    ),
    monitoring: (
      <>
        <path d="M3 12h4l3-8 4 16 3-8h4" />
        <path d="M4 3h16v18H4z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="service-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {iconPaths[type]}
    </svg>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className={`service-icon-wrap ${service.color}`}>
        <ServiceIcon type={service.icon} />
      </div>
      <div className="service-card-heading">
        <div>
          <p className="service-category">{service.category}</p>
          <h3>{service.name}</h3>
        </div>
        <span className="service-short-name">{service.shortName}</span>
      </div>
      <p className="service-description">{service.description}</p>
      <div className="service-card-footer">
        <span>Explore service</span>
        <span aria-hidden="true" className="arrow">
          ↗
        </span>
      </div>
    </article>
  );
}

function HealthCheck() {
  const [health, setHealth] = useState({ state: "idle", message: "" });

  async function checkHealth() {
    setHealth({ state: "loading", message: "Checking backend…" });

    try {
      const response = await fetch("/api/health");
      if (!response.ok) {
        throw new Error(`The backend responded with HTTP ${response.status}.`);
      }

      const result = await response.json();
      if (typeof result.status !== "string") {
        throw new Error("The health response did not include a status.");
      }

      setHealth({
        state: "success",
        message: `Backend status: ${result.status}`,
      });
    } catch (error) {
      setHealth({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to check the backend health.",
      });
    }
  }

  return (
    <section aria-labelledby="health-title" className="health-panel" id="health">
      <div className="health-copy">
        <div className="health-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12h4l3-8 4 16 3-8h4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="eyebrow">Connection check</p>
          <h2 id="health-title">Backend health</h2>
          <p className="health-description">
            Verify that the API is reachable from this dashboard.
          </p>
          {health.message && (
            <p className={`health-result ${health.state}`} role="status">
              <span className="result-dot" aria-hidden="true" />
              {health.message}
            </p>
          )}
        </div>
      </div>
      <button
        className="health-button"
        type="button"
        onClick={checkHealth}
        disabled={health.state === "loading"}
      >
        {health.state === "loading" ? "Checking…" : "Check Backend Health"}
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Cloudscape home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M9.5 22.5h13a5.5 5.5 0 0 0 .7-11 7.5 7.5 0 0 0-14.5 2.1 4.5 4.5 0 0 0 .8 8.9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="m13 19 3-4 3 4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span>cloudscape</span>
        </a>

        <p className="nav-label">WORKSPACE</p>
        <nav aria-label="Main navigation" className="main-nav">
          <a className="nav-link active" href="#overview">
            <span className="nav-symbol" aria-hidden="true">◫</span>
            Overview
          </a>
          <a className="nav-link" href="#services">
            <span className="nav-symbol" aria-hidden="true">◇</span>
            Cloud services
          </a>
          <a className="nav-link" href="#health">
            <span className="nav-symbol" aria-hidden="true">⌁</span>
            Backend health
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="note-icon" aria-hidden="true">✦</span>
            <p>
              <strong>Cloud, made clear.</strong>
              <span>Your services in one place.</span>
            </p>
          </div>
          <div className="profile">
            <div className="avatar" aria-hidden="true">CE</div>
            <div>
              <strong>Cloud Engineer</strong>
              <span>Workspace</span>
            </div>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>Overview</strong>
          </div>
          <div className="topbar-right">
            <span className="environment-pill">
              <span className="environment-dot" />
              Cloud workspace
            </span>
            <button
              className="icon-button"
              type="button"
              aria-label="Notifications"
              title="Notifications"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 13h4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="notification-dot" />
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-section">
            <div>
              <p className="eyebrow">CLOUD ENGINEERING</p>
              <h1>Your cloud workspace</h1>
              <p className="welcome-description">
                A clear view of the services that power your infrastructure.
              </p>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <span className="art-orbit orbit-one" />
              <span className="art-orbit orbit-two" />
              <span className="art-cloud">
                <svg viewBox="0 0 80 60" fill="none">
                  <path
                    d="M23 45h36a13 13 0 0 0 1.8-25.9A21 21 0 0 0 20 25a10 10 0 0 0 3 20Z"
                    fill="currentColor"
                    fillOpacity=".14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M32 38h16m-8-9v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="art-star star-one">✦</span>
              <span className="art-star star-two">✧</span>
            </div>
          </section>

          <section aria-labelledby="services-title" className="services-section" id="services">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR TOOLKIT</p>
                <h2 id="services-title">Cloud services</h2>
              </div>
              <span className="service-count">05 services</span>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          </section>

          <HealthCheck />
          <footer className="page-footer">
            <span>Cloudscape Dashboard</span>
            <span>Built for a clearer cloud view</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
