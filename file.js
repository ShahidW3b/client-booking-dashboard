const app = document.getElementById("app"),
  burgerBtn = document.getElementById("burgerBtn"),
  nav = document.getElementById("nav"),
  pageHeading = document.getElementById("pageHeading"),
  pageSubheading = document.getElementById("pageSubheading"),
  bookingModal = document.getElementById("bookingModal"),
  openBookingBtn = document.getElementById("openBookingBtn"),
  closeModalBtn = document.getElementById("closeModalBtn"),
  bookingForm = document.getElementById("bookingForm"),
  resetFormBtn = document.getElementById("resetFormBtn"),
  searchInput = document.getElementById("searchInput"),
  statusFilter = document.getElementById("statusFilter"),
  roleSelect = document.getElementById("roleSelect"),
  toast = document.getElementById("toast"),
  modalTitle = document.getElementById("modalTitle"),
  modalDescription = document.getElementById("modalDescription"),
  bookingSubmitBtn = document.getElementById("bookingSubmitBtn");

const headings = {
  dashboard: [
    "Service Dashboard",
    "A workflow-ready control center for ShahidW3b bookings, services, team responsibilities, products, settings, and analytics.",
  ],
  bookings: [
    "Bookings",
    "Manage the full booking lifecycle: create, edit, filter, confirm, reject, or delete requests.",
  ],
  services: [
    "Services",
    "Bookable offers for clients, students, researchers, and professionals.",
  ],
  team: [
    "Team",
    "Clear service ownership across design, development, language preparation, and manuscript support.",
  ],
  products: ["Products", "Showcase active products and digital systems."],
  courses: [
    "Courses / Terms",
    "Preparation plans, support terms, and service expectations.",
  ],
  analytics: [
    "Analytics",
    "Track service demand, revenue estimates, workflow status, and operational performance.",
  ],
  settings: [
    "Settings",
    "Control brand identity, booking mode, notifications, and data readiness.",
  ],
};

const services = [
  {
    name: "Website Design",
    desc: "Designed and developed by Shahid: modern websites, landing pages, portfolios, dashboards, booking flows, and responsive interfaces.",
    price: "Lead: Shahabuddin Shahid",
  },
  {
    name: "Essay Writing Help",
    desc: "Essay planning, structure, editing, academic clarity, grammar improvement, and language polishing handled by Linda Nedy.",
    price: "Lead: Linda Ney",
  },
  {
    name: "Language Preparation",
    desc: "Language preparation, speaking practice, writing correction, vocabulary building, and exam-focused study plans handled by Linda Nedy.",
    price: "Lead: Linda Ney",
  },
  {
    name: "Manuscript Writing Help",
    desc: "Manuscript structure, abstract refinement, journal-style editing, formatting, and submission support handled by Mahjabin Shahid.",
    price: "Lead: Mahjabin Shahid",
  },
];

const team = [
  {
    name: "Shahabuddin Shahid",
    desc: "Founder-level lead for UI/UX design, frontend development, dashboard systems, website delivery, and technical product setup.",
    price: "Design & Development",
  },
  {
    name: "Linda Ney",
    desc: "Responsible for essay writing support, academic language improvement, grammar editing, and language preparation plans.",
    price: "Essay & Language",
  },
  {
    name: "Mahjabin Shahid",
    desc: "Responsible for manuscript writing support, scientific editing, abstract polishing, formatting, and research-paper preparation.",
    price: "Manuscript Help",
  },
];

const products = [
  {
    name: "Crystal Cleaning Platform",
    desc: "A service booking website for cleaning operations and customer requests.",
    price: "Live Product",
    link: "https://cystal-nest-clearing.vercel.app/",
  },
  {
    name: "Axonyra Research Interface",
    desc: "A research-facing platform for AI safety, behavior, and cybersecurity positioning.",
    price: "Live Product",
    link: "https://axonyra.vercel.app/",
  },
  {
    name: "Client Booking System",
    desc: "A reusable booking workflow that can be connected to forms, email notifications, or a database.",
    price: "Studio-ready",
    link: "https://client-booking-dashboard-phi.vercel.app/",
  },
  {
    name: "ShahidW3b Admin Dashboard",
    desc: "This admin dashboard for bookings, services, team roles, products, terms, and analytics.",
    price: "Current System",
  },
];

const courses = [
  {
    name: "Language Preparation Plan",
    desc: "Weekly preparation blocks, speaking practice, writing correction, grammar review, and progress tracking.",
    price: "Linda Nedy",
  },
  {
    name: "Website Project Terms",
    desc: "Discovery, design preview, development, revision window, and delivery package.",
    price: "Milestone-based",
  },
  {
    name: "Essay Support Terms",
    desc: "Editing, structure, language improvement, and guidance only. Final responsibility and academic integrity remain with the client.",
    price: "Transparent scope",
  },
  {
    name: "Manuscript Support Terms",
    desc: "Scientific writing help, formatting, and language refinement only. No data fabrication, false authorship, or unethical claims.",
    price: "Mahjabin Shahid",
  },
];

const defaultBookings = [
  {
    id: 1,
    client: "Sarah Miller",
    email: "sarah.miller@example.com",
    service: "Website Design",
    date: "2026-04-25",
    status: "Confirmed",
    price: 499,
    notes:
      "Portfolio website with service sections, booking form, and contact flow.",
  },
  {
    id: 2,
    client: "Omar Rahimi",
    email: "omar.rahimi@example.com",
    service: "Language Preparation",
    date: "2026-04-26",
    status: "Pending",
    price: 120,
    notes:
      "Speaking and writing preparation package for an upcoming language exam.",
  },
  {
    id: 3,
    client: "Emily Carter",
    email: "emily.carter@example.com",
    service: "Essay Writing Help",
    date: "2026-04-27",
    status: "Rejected",
    price: 89,
    notes:
      "Essay structure, argument flow, grammar correction, and final polishing.",
  },
  {
    id: 4,
    client: "Dr. Hasan",
    email: "dr.hasan@example.com",
    service: "Manuscript Writing Help",
    date: "2026-04-28",
    status: "Confirmed",
    price: 350,
    notes:
      "Abstract, introduction, results section, and journal formatting support.",
  },
];

let bookings =
  JSON.parse(localStorage.getItem("shahidw3bBookings") || "null") ||
  defaultBookings;
let currentRole = localStorage.getItem("shahidw3bRole") || "admin";
let editingBookingId = null;
roleSelect.value = currentRole;

const formatDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
const money = (v) => `$${Number(v || 0).toLocaleString()}`;
const saveBookings = () =>
  localStorage.setItem("shahidw3bBookings", JSON.stringify(bookings));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(
    () => toast.classList.remove("show"),
    2200,
  );
}

function setView(view) {
  document
    .querySelectorAll(".view")
    .forEach((i) => i.classList.remove("active"));
  document.getElementById(`${view}View`).classList.add("active");
  nav.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      setView(b.dataset.view);

      if (window.innerWidth <= 760) {
        app.classList.remove("sidebar-open");
      }
    });
  });
  pageHeading.textContent = headings[view][0];
  pageSubheading.textContent = headings[view][1];
}

function openBookingModal(mode = "create", booking = null) {
  editingBookingId = booking?.id || null;
  bookingForm.reset();
  modalTitle.textContent =
    mode === "edit" ? "Edit Booking" : "Create New Booking";
  modalDescription.textContent =
    mode === "edit"
      ? "Update client details, service value, notes, or lifecycle status."
      : "Add a real client request to the dashboard table.";
  bookingSubmitBtn.querySelector("strong").textContent =
    mode === "edit" ? "Save Changes" : "Add Booking";

  if (booking) {
    bookingForm.client.value = booking.client;
    bookingForm.email.value = booking.email;
    bookingForm.service.value = booking.service;
    bookingForm.status.value = booking.status;
    bookingForm.date.value = booking.date;
    bookingForm.price.value = booking.price;
    bookingForm.notes.value = booking.notes || "";
  }

  bookingModal.classList.add("open");
  bookingModal.setAttribute("aria-hidden", "false");
}

function closeBookingModal() {
  bookingModal.classList.remove("open");
  bookingModal.setAttribute("aria-hidden", "true");
  editingBookingId = null;
}

function statusControl(b) {
  const disabled = currentRole === "viewer" ? "disabled" : "";
  return `<select class="select" data-status-id="${b.id}" ${disabled} style="min-height:38px;border-radius:12px;padding:0 10px;">${[
    "Pending",
    "Confirmed",
    "Rejected",
  ]
    .map((s) => `<option ${b.status === s ? "selected" : ""}>${s}</option>`)
    .join("")}</select>`;
}

function bookingActions(b) {
  if (currentRole === "viewer")
    return `<span class="muted-note">Read only</span>`;
  return `<div class="action-group">
          <button class="action-btn" data-edit-id="${b.id}">Edit</button>
          <button class="action-btn danger-btn" data-delete-id="${b.id}">Delete</button>
        </div>`;
}

function bookingTable(data, editable = false) {
  if (!data.length)
    return `<p style="color:var(--muted);line-height:1.7;">No bookings matched your search.</p>`;
  const actionHead = editable ? "<th>Actions</th>" : "";
  return `<table><thead><tr><th>Client</th><th>Service</th><th>Date</th><th>Value</th><th>Status</th>${actionHead}</tr></thead><tbody>${data
    .map(
      (b) =>
        `<tr><td><strong style="color:white;">${b.client}</strong><br><span style="color:var(--muted);font-size:12px;">${b.email}</span></td><td>${b.service}</td><td>${formatDate(b.date)}</td><td>${money(b.price)}</td><td>${editable ? statusControl(b) : `<span class="status ${b.status}"><span class="status-dot"></span>${b.status}</span>`}</td>${editable ? `<td>${bookingActions(b)}</td>` : ""}</tr>`,
    )
    .join("")}</tbody></table>`;
}

function filteredBookings() {
  const q = (searchInput?.value || "").toLowerCase().trim(),
    status = statusFilter?.value || "All";
  return bookings.filter(
    (b) =>
      (!q ||
        b.client.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q)) &&
      (status === "All" || b.status === status),
  );
}

function renderStats() {
  const total = bookings.length,
    pending = bookings.filter((b) => b.status === "Pending").length,
    confirmed = bookings.filter((b) => b.status === "Confirmed").length,
    rejected = bookings.filter((b) => b.status === "Rejected").length,
    revenue = bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((s, b) => s + Number(b.price || 0), 0);
  const html = [
    ["Total Bookings", total],
    ["Pending Requests", pending],
    ["Confirmed", confirmed],
    ["Rejected", rejected],
    ["Confirmed Revenue", money(revenue), "wide"],
  ]
    .map(
      ([l, v, type]) =>
        `<div class="card stat" style="${type === "wide" ? "grid-column: 1 / -1;" : ""}"><span>${l}</span><strong>${v}</strong></div>`,
    )
    .join("");
  document.getElementById("statsGrid").innerHTML = html;
  document.getElementById("analyticsStats").innerHTML = html;
}

function renderPipeline() {
  const statusGroups = ["Pending", "Confirmed", "Rejected"];
  document.getElementById("pipelineGrid").innerHTML = statusGroups
    .map((status) => {
      const group = bookings.filter((b) => b.status === status);
      const value = group.reduce((sum, b) => sum + Number(b.price || 0), 0);
      return `<div class="pipeline-card"><span>${status} Pipeline</span><strong>${group.length}</strong><p class="muted-note">Estimated value: ${money(value)}</p></div>`;
    })
    .join("");
}

function renderCards(id, data, cls) {
  document.getElementById(id).innerHTML = data
    .map(
      (x) => `<article class="${cls}">
          <strong>${x.name}</strong><p>${x.desc}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:12px;">
            <span class="price" style="margin-top:0;">${x.price}</span>
            ${x.link ? `<a href="${x.link}" target="_blank" rel="noopener noreferrer" style="margin-left:auto;color:var(--accent);font-weight:800;text-decoration:none;">Visit Product ↗</a>` : ""}
          </div></article>`,
    )
    .join("");
}

function renderActivity() {
  document.getElementById("activityList").innerHTML = bookings
    .slice(-4)
    .reverse()
    .map(
      (b) =>
        `<div class="activity-item"><strong>${b.client} · ${b.service}</strong><p>${b.status} request for ${formatDate(b.date)} · ${money(b.price)}</p></div>`,
    )
    .join("");
}

function renderCharts() {
  const counts = services.map((s) => ({
    name: s.name.split(" ")[0],
    count: bookings.filter((b) => b.service === s.name).length,
  }));
  const max = Math.max(...counts.map((i) => i.count), 1);
  const html = counts
    .map(
      (i) =>
        `<div class="bar" title="${i.count} booking(s)" style="height:${40 + (i.count / max) * 150}px"><span>${i.name}</span></div>`,
    )
    .join("");
  document.getElementById("miniChart").innerHTML = html;
  document.getElementById("analyticsChart").innerHTML = html;
}

function bindBookingTableEvents() {
  document.querySelectorAll("[data-status-id]").forEach((s) => {
    s.addEventListener("change", () => {
      const id = Number(s.dataset.statusId);
      bookings = bookings.map((b) =>
        b.id === id ? { ...b, status: s.value } : b,
      );
      saveBookings();
      renderAll();
      showToast("Booking status updated.");
    });
  });
  document.querySelectorAll("[data-edit-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const booking = bookings.find((b) => b.id === Number(btn.dataset.editId));
      if (booking) openBookingModal("edit", booking);
    });
  });
  document.querySelectorAll("[data-delete-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const booking = bookings.find(
        (b) => b.id === Number(btn.dataset.deleteId),
      );
      if (!booking) return;
      if (!confirm(`Delete booking for ${booking.client}?`)) return;
      bookings = bookings.filter((b) => b.id !== booking.id);
      saveBookings();
      renderAll();
      showToast("Booking deleted.");
    });
  });
}

function renderBookings() {
  document.getElementById("dashboardTable").innerHTML = bookingTable(
    bookings.slice(-5).reverse(),
  );
  document.getElementById("bookingsTable").innerHTML = bookingTable(
    filteredBookings(),
    true,
  );
  bindBookingTableEvents();
}

function renderAll() {
  renderStats();
  renderPipeline();
  renderCards("servicesGrid", services, "service-card");
  renderCards("teamGrid", team, "service-card");
  renderCards("productsGrid", products, "product-card");
  renderCards("coursesGrid", courses, "course-card");
  renderActivity();
  renderCharts();
  renderBookings();
  openBookingBtn.disabled = currentRole === "viewer";
  openBookingBtn.style.opacity = currentRole === "viewer" ? "0.5" : "1";
}

burgerBtn.addEventListener("click", () => app.classList.toggle("sidebar-open"));
nav
  .querySelectorAll("button")
  .forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
document.querySelectorAll("[data-quick-view]").forEach((b) => {
  b.addEventListener("click", () => {
    setView(b.dataset.quickView);

    if (window.innerWidth > 760) {
      app.classList.add("sidebar-open");
    } else {
      app.classList.remove("sidebar-open");
    }
  });
});
openBookingBtn.addEventListener("click", () =>
  currentRole === "admin"
    ? openBookingModal("create")
    : showToast("Viewer mode is read-only."),
);
closeModalBtn.addEventListener("click", closeBookingModal);
bookingModal.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeBookingModal();
});
resetFormBtn.addEventListener("click", () => bookingForm.reset());
roleSelect.addEventListener("change", () => {
  currentRole = roleSelect.value;
  localStorage.setItem("shahidw3bRole", currentRole);
  renderAll();
  showToast(
    currentRole === "admin"
      ? "Admin mode enabled."
      : "Viewer mode enabled. Editing disabled.",
  );
});

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (currentRole !== "admin") return showToast("Viewer mode is read-only.");
  const f = new FormData(bookingForm);
  const price = Number(f.get("price"));
  if (!Number.isFinite(price) || price <= 0)
    return showToast("Please enter a value greater than $0.");
  const payload = {
    client: String(f.get("client")).trim(),
    email: String(f.get("email")).trim(),
    service: f.get("service"),
    date: f.get("date"),
    status: f.get("status"),
    price,
    notes: f.get("notes") || "No notes added.",
  };
  if (!payload.client || !payload.email || !payload.service || !payload.date)
    return showToast("Please complete all required fields.");
  if (editingBookingId) {
    bookings = bookings.map((b) =>
      b.id === editingBookingId ? { ...b, ...payload } : b,
    );
    showToast("Booking updated successfully.");
  } else {
    bookings.push({ id: Date.now(), ...payload });
    showToast("Booking created successfully.");
  }
  bookingForm.reset();
  closeBookingModal();
  app.classList.add("sidebar-open");
  setView("bookings");
  saveBookings();
  renderAll();
});

searchInput.addEventListener("input", renderBookings);
statusFilter.addEventListener("change", renderBookings);

document.getElementById("exportBtn").addEventListener("click", () => {
  const data = document
    .getElementById("bookingsView")
    .classList.contains("active")
    ? filteredBookings()
    : bookings;
  const rows = data
    .map(
      (b) =>
        `${b.client},${b.email},${b.service},${b.date},${b.status},${b.price}`,
    )
    .join("\n");
  const blob = new Blob([`Client,Email,Service,Date,Status,Value\n${rows}`], {
    type: "text/csv",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "shahidw3b-bookings-report.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("CSV report exported.");
});

renderAll();
