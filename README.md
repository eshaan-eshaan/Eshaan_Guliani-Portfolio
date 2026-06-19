# 🌌 Eshaan Guliani | AI Generalist Portfolio

Welcome to the repository of my interactive personal portfolio. Built with a focus on visual performance, micro-interactions, and professional credibility, this website showcases my projects, skills, and product thinking.

🖥️ **Live Site:** [https://Eshaan-Guliani-Portfolio.vercel.app](https://github.com/eshaan-eshaan/Eshaan_Guliani-Portfolio) *(Or your Vercel deployment)*

---

## ✨ Features & Visual Highlights

*   **Premium Dark Aesthetics:** Sleek, high-contrast dark interface utilizing the `Kanit` & `Inter` Google fonts with vibrant HSL gradient details.
*   **Parallax & Micro-Interactions:** Custom mouse-responsive magnetic buttons (`Magnet.tsx`) and scroll-reveal transitions driven by Framer Motion.
*   **Scroll-Skew Velocity Marquee:** Dynamically calculates scroll speed to bend, stretch, and skew project card rows on the fly for a highly responsive, physical feel.
*   **Google Sheets Contact Integration:** A serverless form handler that securely relays visitor messages directly to a private Google Sheet using Google Apps Script.
*   **Session-Aware Visit Counter:** A custom floating dashboard badge showing visits logged locally via `localStorage`, featuring a live glowing network ping.

---

## 🛠️ Tech Stack & Architecture

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62B)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

*   **Framework:** React 18 SPA (Vite builder)
*   **Styling:** Tailwind CSS (utility-first, custom glassmorphic properties)
*   **Animation Engine:** Framer Motion (Scroll progress interpolation & orchestrations)
*   **Icons:** Lucide React
*   **Database Endpoint:** Google Apps Script Webhooks

---

## 📁 Project Spotlights

### 01. LLM Hallucination Detector `Chrome Extension / NLP`
An end-to-end hallucination detection system for LLM responses, spanning model research, API design, frontend development, and browser extension deployment.

### 02. VoteSphere - Secure Voting System `Full-Stack Development`
Designed a secure RESTful voting platform with end-to-end encryption and real-time vote tracking, deployed on cloud infrastructure with a balanced MySQL database.

### 03. Deepfake Detection System `Computer Vision`
Designed and trained CNN-based deepfake detection models achieving 86% accuracy, featuring custom augmentation pipelines and complete model optimization workflows.

---

## 🚀 Local Development Setup

To run the project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/eshaan-eshaan/Eshaan_Guliani-Portfolio.git
    cd Eshaan_Guliani-Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory:
    ```env
    VITE_GOOGLE_SHEET_WEBHOOK_URL=your_google_script_url
    ```

4.  **Run the local development server:**
    ```bash
    npm run dev
    ```

---

## 📊 Serverless Google Sheets Form Integration

To set up the contact database:

1.  Create a blank **Google Sheet** and name the tab `Sheet1`.
2.  Add headers in Row 1: `Timestamp`, `Name`, `Email`, `Message`, `Services Needed`.
3.  Go to **Extensions > Apps Script**, paste the following code, and save:
    ```javascript
    function doPost(e) {
      try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
        var data = (e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : e.parameter;
        
        var row = [
          new Date(),
          data.name || "",
          data.email || "",
          data.message || "",
          data.services ? (Array.isArray(data.services) ? data.services.join(", ") : data.services) : ""
        ];
        
        sheet.appendRow(row);
        return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
      } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    ```
4.  Click **Deploy > New deployment > Web app**. Set *Execute as* to "Me" and *Who has access* to "Anyone".
5.  Copy the generated **Web app URL** and assign it to `VITE_GOOGLE_SHEET_WEBHOOK_URL` in your `.env` or Vercel dashboard.

---

## 📬 Contact & Connect

*   **Email:** [eshaan1311@gmail.com](mailto:eshaan1311@gmail.com)
*   **LinkedIn:** [Eshaan Guliani](https://www.linkedin.com/in/eshaan-guliani-b14489344)
*   **Google Site:** [Eshaan Portfolio](https://sites.google.com/view/eshaanguliani/home?authuser=0)
*   **GitHub:** [@eshaan-eshaan](https://github.com/eshaan-eshaan)
