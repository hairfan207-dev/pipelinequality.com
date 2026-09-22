# Pipeline Quality Website Overhaul - Deployment Instructions

**Date:** April 2026  
**Status:** Ready for Implementation  
**Client:** Pipeline Quality / Backpack Wander GmbH

---

## ✅ Overview

This document contains all instructions needed to update the Pipeline Quality website according to client specifications. Three industrial images have been provided and must be integrated into specific sections.

---

## 📋 File Checklist

Before starting, ensure you have:
- [ ] `heavy_steel.png` - Hero section background (16:9 aspect ratio)
- [ ] `ndt_close.png` - Field Inspection section (16:9 aspect ratio)
- [ ] `weld_tracking.png` - MDR Documentation section (16:9 aspect ratio)

---

## 🎨 Design System

### Color Palette (Update CSS/Design Tokens)
```
Background:       #1A1B1E (Dark industrial)
Primary Button:   #FF6600 (Orange accent)
Links/Data:       #00A3FF (Bright blue)
```

### Visual Style
- High contrast layout
- Industrial macro textures (provided in images)
- Audit-ready, professional aesthetic

---

## 🏗️ Section-by-Section Changes

### SECTION 1: Hero (REPLACE)

**Current Status:** ❌ REPLACE ENTIRELY

**Hero Headline (English):**
```
Audit-Ready Fabrication.
Delivered Right. First Time.
```

**Hero Headline (German):**
```
Audit-bereite Fertigung.
Beim ersten Mal richtig geliefert.
```

**Sub-headline (English):**
```
We help engineering teams deliver on-site QA/QC and compliant documentation 
for XXL Monopiles, Pressure Vessels, and Industrial Piping—aligned with ISO, 
DNV, and PED requirements.
```

**Sub-headline (German):**
```
Wir unterstützen Engineering-Teams bei QA/QC vor Ort und normgerechter 
Dokumentation für XXL-Monopiles, Druckbehälter und Rohrleitungen -- 
gemäß ISO-, DNV- und PED-Anforderungen.
```

**Availability Note (below CTAs - English):**
```
Available for short-term and long-term projects across Europe.
```

**Availability Note (below CTAs - German):**
```
Verfügbar für kurz- und langfristige Projekte europaweit.
```

**Call-to-Action Buttons (English):**
- `[Book a Documentation Audit]` → Link to audit booking page
- `[View Services]` → Link to services section

**Call-to-Action Buttons (German):**
- `[Dokumentations-Audit buchen]` → Link to audit booking page
- `[Dienstleistungen anzeigen]` → Link to services section

**Visual Asset:**
- **Image:** `heavy_steel.png`
- **Placement:** Full-width background or hero image
- **Aspect Ratio:** 16:9
- **Alternative:** Can be used as background overlay or as image within hero container

---

### SECTION 2: Services (REPLACE with 2-Column Layout)

**Current Status:** ❌ REPLACE "Services" section with new 2-column structure

**Layout:** Two equal columns side-by-side (responsive stack on mobile)

#### **Column 1: Field Inspection & Coordination**

**Headline:** "Field Inspection & Coordination" (EN) / "Inspektion vor Ort & Koordination" (DE)

**Body Text (English):**
```
On-site NDT management, welding supervision, and coating inspections. 
We ensure the steel meets the standard before it leaves the yard—reducing 
NCRs, delays, and client escalations.

Experience across offshore wind fabrication yards, heavy industry, and 
complex welding environments.
```

**Body Text (German):**
```
Vor-Ort-ZfP-Management, Schweißaufsicht und Beschichtungsprüfungen. 
Wir stellen sicher, dass der Stahl den Normen entspricht, bevor er das 
Werk verlässt -- zur Reduzierung von Abweichungen (NCRs), Verzögerungen 
und Kundeneskalationen.

Erfahrung in Offshore-Wind-Fertigung, Schwerindustrie und komplexen 
Schweißumgebungen.
```

**Visual Asset:**
- **Image:** `ndt_close.png`
- **Placement:** Above or below text in left column
- **Aspect Ratio:** 16:9

---

#### **Column 2: Remote MDR Management**

**Headline:** "Remote MDR Management" (EN) / "Remote MDR-Management" (DE)

**Body Text (English):**
```
We handle the "Paperwork War." Automated compilation of Manufacturing 
Data Reports (MDR) that are structured, traceable, and audit-ready 
at any time.
```

**Body Text (German):**
```
Wir gewinnen den "Dokumentationskrieg". Automatisierte Erstellung von 
Fertigungsdokumentationen (MDR) -- strukturiert, rückverfolgbar und 
jederzeit audit-bereit.
```

**Visual Asset:**
- **Image:** `weld_tracking.png`
- **Placement:** Above or below text in right column
- **Aspect Ratio:** 16:9

---

### SECTION 3: Smart QA/QC (NEW - INSERT BETWEEN SERVICES & STANDARDS)

**Current Status:** ✨ NEW SECTION - Insert here

**Position:** Between Section 2 (Services) and the "Standards" section

**Headline (English):**
```
Smart QA/QC: Powered by Pipeline Quality AI
```

**Headline (German):**
```
Smart QA/QC: Unterstützt durch Pipeline Quality AI
```

**Body Text (English):**
```
Manual logs are the graveyard of project margins. In partnership with 
BW Digit, we develop custom tools to automate MDR generation, cross-check 
material traceability, and flag inconsistencies before audits, ensuring 
full traceability across MTRs, weld logs and NDT reports.
```

**Body Text (German):**
```
Manuelle Protokolle gefährden Projektmargen. Mit BW Digit entwickeln wir 
Tools zur automatisierten MDR-Erstellung, Materialrückverfolgbarkeit zu 
prüfen sowie Abweichungen vor Audits zu erkennen -- für volle Transparenz 
bei MTRs, Schweiß- und ZfP-Protokollen.
```

**Features List (English):**
- Real-time Weld Tracking
- Automated MDR Compilation
- AI-Assisted Documentation Audit

**Features List (German):**
- Schweißnaht-Tracking in Echtzeit
- Automatisierte MDR-Erstellung
- KI-gestützte Dokumentationsprüfung

**Layout:** Single column, feature list below body text (can use icon + text format)

---

### SECTION 4: Standards (UPDATE EXISTING SECTION)

**Current Status:** ✏️ UPDATE - Add new standards to existing list

**Add these bullets to the "Standards" section on BOTH language versions:**

**English Standards to Add:**
- ISO 12944 (C5/CX Corrosion)
- ISO 9712 (NDT)
- DNV-ST-0126 (Offshore Wind)
- PED 2014/68/EU (Pressure Equipment)
- FROSIO/NACE Level 3

**German Standards to Add:**
- ISO 12944 (C5/CX Korrosionsschutz)
- ISO 9712 (ZfP)
- DNV-ST-0126 (Offshore-Windstrukturen)
- Druckgeräterichtlinie 2014/68/EU
- FROSIO/NACE Level 3

---

## 📱 SEO & Meta Tags

### Meta Title
```
QA/QC Contractor | Inspection & MDR Documentation for Offshore & Industrial Projects
```

### Meta Description (English)
```
Specialist QA/QC contractor for XXL Monopiles, Pressure Vessels, and Offshore Wind. 
Digital-first welding inspection and audit-ready MDR management.
```

### Meta Description (German)
```
Spezialisierter QA/QC-Dienstleister für XXL-Monopiles, Druckbehälter und Offshore-Wind. 
Digital-first Schweißinspektion und MDR-Dokumentation.
```

---

## 🔗 Legal Footer & Privacy

### Footer Text (English)
```
Pipeline Quality is a brand of Backpack Wander GmbH. Technical partner: BW Digit. 
Independent QA/QC Contractor Services.
```

### Footer Text (German)
```
Pipeline Quality ist eine Marke der Backpack Wander GmbH. Technischer Partner: BW Digit. 
Unabhängige QA/QC-Dienstleistungen.
```

### Privacy Statement (German - "Datenschutz")
```
Die Datenverarbeitung für die digitale Dokumentation wird durch unseren technischen 
Partner BW Digit unterstützt.
```

### Impressum (Legal Notice)
List under **Backpack Wander GmbH** with:
- Managing Director / Geschäftsführer name
- HRB number (commercial register number)

---

## 📸 Image Asset Specifications

| Image Name | Section | Purpose | Aspect Ratio | Suggested Dimensions |
|---|---|---|---|---|
| `heavy_steel.png` | Hero (Section 1) | Hero background/visual | 16:9 | 1920×1080px or 1280×720px |
| `ndt_close.png` | Section 2 - Column 1 | Field Inspection visual | 16:9 | 1920×1080px or 1280×720px |
| `weld_tracking.png` | Section 2 - Column 2 | MDR Management visual | 16:9 | 1920×1080px or 1280×720px |

**Placement Instructions:**
- All images should maintain 16:9 aspect ratio
- Images can be integrated as backgrounds, full-width images, or contained within cards
- Ensure high contrast against background color (#1A1B1E)
- Consider lazy loading for performance

---

## 🔧 Implementation Checklist

### Phase 1: Structure & Content
- [ ] Replace Hero section with new headline, sub-headline, CTAs, and availability note
- [ ] Replace Services section with 2-column layout
- [ ] Insert new Section 3 (Smart QA/QC) between Services and Standards
- [ ] Update Standards section with new certifications

### Phase 2: Styling & Colors
- [ ] Update color palette: BG #1A1B1E, Buttons #FF6600, Links #00A3FF
- [ ] Apply industrial design aesthetic
- [ ] Ensure high contrast for readability
- [ ] Test on all device sizes (mobile, tablet, desktop)

### Phase 3: Images
- [ ] Add `heavy_steel.png` to Hero section
- [ ] Add `ndt_close.png` to Section 2, Column 1
- [ ] Add `weld_tracking.png` to Section 2, Column 2
- [ ] Optimize images for web (compression while maintaining quality)
- [ ] Test image loading and responsive behavior

### Phase 4: SEO & Meta
- [ ] Update page title
- [ ] Update meta description (both EN & DE)
- [ ] Add structured data (schema.org if applicable)
- [ ] Update Open Graph tags if applicable

### Phase 5: Legal & Footer
- [ ] Update footer with new company information
- [ ] Add privacy statement (German)
- [ ] Update Impressum with Backpack Wander GmbH details
- [ ] Verify all links work

### Phase 6: Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness check
- [ ] Accessibility audit (WCAG compliance)
- [ ] Performance testing (Lighthouse, WebPageTest)
- [ ] SEO validation (yoast, SEMrush, or similar)

### Phase 7: Deployment
- [ ] Code review
- [ ] QA sign-off
- [ ] Deploy to staging
- [ ] Client review on staging
- [ ] Deploy to production
- [ ] Monitor for errors (Sentry, error logs)

---

## 🌍 Bilingual Implementation Notes

**For both English and German versions:**
- Each section should have separate content in both languages
- Use language switcher/URL structure (e.g., `/en/` and `/de/`)
- Ensure translations are exact (provided above)
- Test on both language versions before deployment

---

## 📝 Git Commit Message Templates

```
feat: Replace hero section with audit-ready messaging

- Update headline and sub-headline (EN/DE)
- Add availability note and new CTAs
- Integrate heavy_steel.png hero image
- Update color scheme (#1A1B1E, #FF6600, #00A3FF)

Fixes: #[issue-number]
```

```
feat: Redesign services section as 2-column layout

- Column 1: Field Inspection & Coordination with ndt_close.png
- Column 2: Remote MDR Management with weld_tracking.png
- Add translations (EN/DE)

Fixes: #[issue-number]
```

```
feat: Add Smart QA/QC AI section

- Insert between Services and Standards
- Add features list (Real-time tracking, MDR automation, AI audit)
- Include BW Digit partnership reference
- Bilingual content (EN/DE)

Fixes: #[issue-number]
```

```
feat: Update standards certifications

- Add ISO 12944, ISO 9712, DNV-ST-0126, PED 2014/68/EU, FROSIO/NACE Level 3
- Translations for German version

Fixes: #[issue-number]
```

---

## ⚠️ Important Notes

1. **Image Naming Convention:** Keep the exact filenames provided:
   - `heavy_steel.png`
   - `ndt_close.png`
   - `weld_tracking.png`

2. **Color Consistency:** Use exact hex codes:
   - Background: `#1A1B1E`
   - Buttons: `#FF6600`
   - Links/Data: `#00A3FF`

3. **Language:** Both EN and DE versions must be updated simultaneously

4. **Footer & Compliance:** Legal footer, Impressum, and Datenschutz are critical and must be accurate

5. **Testing:** Always test responsive design - images and text must look good on all screen sizes

6. **Performance:** Optimize all three images for web before deployment

---

## 📞 Contact & Questions

For clarifications or questions during implementation:
- Refer to this document first
- Check the provided images for context
- Contact client for any ambiguities

---

**Document Version:** 1.0  
**Last Updated:** April 2, 2026  
**Ready for Development:** ✅ YES
