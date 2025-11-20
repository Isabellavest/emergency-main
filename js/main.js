document.addEventListener("DOMContentLoaded", () => {
  // ==================== DARK MODE ==================== //
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  function updateToggleLabel() {
    if (!themeToggle) return;
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.textContent = isDark ? "☀️ Lys" : "🌙 Nat";
  }

  updateToggleLabel();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";

      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }

      updateToggleLabel();
    });
  }

  // ==================== INSTRUCTION (hotspots) ==================== //
  const bundEl = document.querySelector("#hotspotbund");
  const midtEl = document.querySelector("#hotspotmidt");
  const topEl = document.querySelector("#hotspottop");

  if (bundEl || midtEl || topEl) {
    const HOVER = "#98d646";
    const BASE = "#2e522d"; // matcher dine cirkler i SVG'en

    const infoPanel = document.querySelector(".info-text-inner");
    const infoTitle = infoPanel?.querySelector("h2");
    const infoText = infoPanel?.querySelector(".placeholder");
    const efficiencyBox = document.querySelector("#efficiency");
    const requirementBox = document.querySelector("#requirement");

    function updateInfo(title, text, efficiencyHTML, requirementHTML) {
      if (!infoPanel || !infoTitle || !infoText || !efficiencyBox) return;

      // fade/slide UD
      infoPanel.classList.add("is-updating");

      setTimeout(() => {
        // opdatér indhold
        infoTitle.textContent = title;
        infoText.textContent = text;
        efficiencyBox.innerHTML = efficiencyHTML;

        if (requirementBox) {
          requirementBox.innerHTML = requirementHTML || "";
        }

        // fjern fade-out + trig lille fade-in
        infoPanel.classList.remove("is-updating");
        infoPanel.classList.remove("animate-in");
        void infoPanel.offsetWidth; // reset animation
        infoPanel.classList.add("animate-in");
      }, 150);
    }

    // BUND = Bo "Boo" Rasmussen – teknisk spøgelsesjæger
    if (bundEl) {
      bundEl.addEventListener("mouseover", () => (bundEl.style.fill = HOVER));
      bundEl.addEventListener("mouseout", () => (bundEl.style.fill = BASE));
      bundEl.addEventListener("click", () => {
        updateInfo(
          "Spøgelses-alarm: Bo “Boo” Rasmussen",
          "Når noget rumsterer i rør, kældre eller vægge, sender vi Bo “Boo”. Han er teknisk spøgelsesjæger og tager sig af de meget fysiske manifestationer.",
          `
          <h3>👷‍♂️ Bo “Boo” Rasmussen – Teknisk spøgelsesjæger</h3>
          <p>Speciale: kolde pletter, mystiske lyde og installationer, der lever deres eget liv. Perfekt, når du har brug for en jordnær, praktisk tilgang til genfærd.</p>
        `,
          `
          <h3>Kontakt Bo</h3>
          <p>📞 Ring, skriv, eller kald højt – han svarer, hvis energien (og signalet i kælderen) tillader det.</p>
        `
        );
      });
    }

    // MIDT = Luna Lysdal – clairvoyant
    if (midtEl) {
      midtEl.addEventListener("mouseover", () => (midtEl.style.fill = HOVER));
      midtEl.addEventListener("mouseout", () => (midtEl.style.fill = BASE));
      midtEl.addEventListener("click", () => {
        updateInfo(
          "Spøgelses-alarm: Luna Lysdal",
          "Når du har brug for beskeder, clairvoyante indsigter og kontakt til den anden side, er det Luna, der tuner ind.",
          `
          <h3>🔮 Luna Lysdal – Clairvoyant</h3>
          <p>Speciale: klarfølelse, klarsyn og tolkning af åndelig kommunikation. God, når du fornemmer, at nogen prøver at sige noget – men ingen er i rummet.</p>
        `,
          `
          <h3>Kontakt Luna</h3>
          <p>📞 Ring, skriv, eller hvisk dit spørgsmål – hun lytter mellem linjerne (og mellem verdenerne).</p>
        `
        );
      });
    }

    // TOP = Søren Sol – spirituel vejleder
    if (topEl) {
      topEl.addEventListener("mouseover", () => (topEl.style.fill = HOVER));
      topEl.addEventListener("mouseout", () => (topEl.style.fill = BASE));
      topEl.addEventListener("click", () => {
        updateInfo(
          "Spøgelses-alarm: Søren Sol",
          "Når det ikke kun handler om hjemsøgelser, men også om din egen energi, ro og retning, træder Søren ind som spirituel vejleder.",
          `
          <h3>🕯️ Søren Sol – Spirituel vejleder</h3>
          <p>Speciale: grounding, ritualer og langsigtet balance mellem dig og det, der foregår på de mere subtile planer. Perfekt, når du vil have ro – ikke kun akut, men også fremover.</p>
        `,
          `
          <h3>Kontakt Søren</h3>
          <p>📞 Ring, skriv, eller tænd et lys og sæt en intention – han møder dig dér, hvor energien er klar.</p>
        `
        );
      });
    }
  }

  // ==================== REGISTER (form) ==================== //
  const webform = document.querySelector("#webform");
  const summaryEl = document.querySelector("#form-summary .placeholder");

  if (webform) {
    webform.innerHTML = `
    <div class="form-row">
      <label for="name">Fulde navn*</label>
      <input id="name" name="name" type="text" required minlength="2" placeholder="Navn" />
    </div>

    <div class="form-row">
      <label for="email">Email*</label>
      <input id="email" name="email" type="email" required placeholder="Navn@mail.dk" />
    </div>

    <div class="form-row">
      <label for="phone">Telefonnummer*</label>
      <input id="phone" name="phone" type="text" required minlength="8" maxlength="8" pattern="[0-9]{8}" placeholder="12345678" />
      <p class="hint">8 cifre – uden mellemrum.</p>
    </div>

    <div class="form-row">
      <label for="location">Lokation*</label>
      <select id="location" name="location" required>
        <option value="">Vælg område</option>
        <option>Lejlighed</option>
        <option>Villa</option>
        <option>Kælder/loft</option>
        <option>Offentligt sted</option>
      </select>
    </div>

    <fieldset class="form-group form-address">
  <legend>Adresse (valgfri)</legend>

  <label for="street">Gade og nummer</label>
  <input id="street" name="street" type="text" placeholder="Eks. Spøgelsesvejen 13">

  <div class="address-row">
    <div>
      <label for="zipcode">Postnummer</label>
      <input id="zipcode" name="zipcode" type="text" inputmode="numeric" placeholder="2100">
    </div>
    <div>
      <label for="city">By</label>
      <input id="city" name="city" type="text" placeholder="København Ø">
    </div>
  </div>

  <label for="floor">Etage / dør </label>
  <input id="floor" name="floor" type="text" placeholder="Eks. 3. th.">
</fieldset>

        <fieldset class="form-row ghost-type-group">
      <legend>Spøgelsestype*</legend>
      <label class="radio">
        <input type="radio" name="ghostType" value="Den i hjemmet" required />
        Den i hjemmet
      </label>
      <label class="radio">
        <input type="radio" name="ghostType" value="Den på arbejdspladsen" />
        Den på arbejdspladsen
      </label>
      <label class="radio">
        <input type="radio" name="ghostType" value="Den der følger efter dig" />
        Den der følger efter dig
      </label>
      <label class="radio">
        <input type="radio" name="ghostType" value="Den du ikke kan forklare" />
        Den du ikke kan forklare
      </label>
    </fieldset>

    <div class="form-row">
      <label for="desc">Yderligere beskrivelse* <span id="counter" class="meta">0/300</span></label>
      <textarea id="desc" name="desc" rows="5" maxlength="300" required placeholder="Hvad skete der?"></textarea>
    </div>

    <div class="form-row">
      <label for="evidence">Vedhæft ekstra materiale (foto/lyd – valgfrit)</label>
      <input id="evidence" name="evidence" type="file" accept="image/*,audio/*" />
    </div>

    <div class="form-row">
      <label class="checkbox"><input id="consent" name="consent" type="checkbox" required />
        Jeg må gerne kontaktes ang. sagen*</label>
    </div>

    <div class="form-actions">
      <button type="submit">Indsend rapport</button>
      <p id="formMsg" class="form-msg" role="status" aria-live="polite"></p>
    </div>
  `;

    const $ = (s) => document.querySelector(s);
    const desc = $("#desc");
    const counter = $("#counter");
    const evidence = $("#evidence");
    const formMsg = $("#formMsg");
    const phone = $("#phone");
    const submitBtn = webform.querySelector('button[type="submit"]');
    const consent = $("#consent");

    const MAX = parseInt(desc.getAttribute("maxlength") || "300", 10);
    const updateCount = () =>
      (counter.textContent = `${desc.value.length}/${MAX}`);
    desc.addEventListener("input", updateCount);
    updateCount();

    evidence.addEventListener("change", () => {
      const f = evidence.files?.[0];
      if (!f) return;
      if (f.size > 10 * 1024 * 1024) {
        evidence.value = "";
        alert("Filen er større end 10 MB. Vælg en mindre fil.");
      }
    });

    phone.addEventListener("input", () => {
      const v = phone.value.replace(/\D/g, "").slice(0, 8);
      phone.value = v;
      phone.classList.toggle("is-valid", v.length === 8);
      phone.classList.toggle("is-invalid", v.length > 0 && v.length < 8);
    });

    submitBtn.disabled = true;
    consent.addEventListener("change", (e) => {
      submitBtn.disabled = !e.target.checked;
    });

    function updateSummary(data) {
      if (!summaryEl) return;
      summaryEl.innerHTML = `
    <div class="sum">
      <h3>${data.name}</h3>
      <p>
        <strong>Tlf:</strong> ${data.phone} • 
        <strong>Email:</strong> ${data.email}
      </p>

      <p>
        <strong>Lokation:</strong> ${data.location} • 
        <strong>Trussel:</strong> ${data.threat} • 
        <strong>Spøgelsestype:</strong> ${data.ghostType}
      </p>

      <p><strong>Dato:</strong> ${data.date}</p>

      <p>${data.desc}</p>
    </div>`;
    }

    webform.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!webform.checkValidity()) {
        webform.reportValidity();
        formMsg.textContent = "Tjek de markerede felter.";
        return;
      }

      const fd = new FormData(webform);
      const data = Object.fromEntries(fd.entries());
      data.threat = fd.get("threat") || "";
      data.ghostType = fd.get("ghostType") || "";

      data.name = data.name.trim();
      data.email = data.email.trim();
      data.phone = data.phone.trim();
      data.desc = data.desc.trim();

      updateSummary(data);

      formMsg.textContent = "Tak! Din rapport er modtaget 👻";
      webform.reset();
      updateCount();
      setTimeout(() => (formMsg.textContent = ""), 2500);
    });
  }

  // ==================== FORSIDE/INDEX - BREAKING (modals på forsiden) ==================== //
  const openButtons = document.querySelectorAll(".open-dialog");
  const closeButtons = document.querySelectorAll(".close-dialog");

  openButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const dialogId = button.dataset.dialog;
      const dialog = document.getElementById(dialogId);
      if (dialog) dialog.showModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  // ==================== FORSIDE/INDEX - INFO (i) bokse i cards ==================== //
  const infoButtons = document.querySelectorAll(".news_card .info-btn");
  const allPopovers = document.querySelectorAll(".news_card .popover");

  function hideAllPopovers() {
    allPopovers.forEach((el) => {
      el.classList.remove("is-visible");
      el.hidden = true;
    });
  }

  infoButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();

      const card = btn.closest(".news_card");
      if (!card) return;

      const popover = card.querySelector(".popover");
      if (!popover) return;

      const wasVisible = popover.classList.contains("is-visible");

      // Luk alle andre først
      hideAllPopovers();

      // Hvis denne allerede var synlig, så er den nu lukket → stop
      if (wasVisible) return;

      // Vis popover for dette kort
      popover.hidden = false;
      popover.classList.add("is-visible");
    });
  });

  // Klik udenfor lukker alle popovers
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".info-btn") &&
      !event.target.closest(".popover")
    ) {
      hideAllPopovers();
    }
  });
});
