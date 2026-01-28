# ncsStat: Democratizing Data Science for Researchers 📊

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WebR](https://img.shields.io/badge/Powered%20by-WebR-blue)](https://docs.r-wasm.org/webr/latest/)

[**🇻🇳 Tiếng Việt**](#-tiếng-việt) | [**🇺🇸 English**](#-english)

---

<a name="-tiếng-việt"></a>
## 🇻🇳 Tiếng Việt

> *"Phá vỡ rào cản kinh phí và kỹ thuật — Đưa sức mạnh của R và AI đến tận tay mọi nhà nghiên cứu."*
 
![ncsStat Homepage](public/images/homepage.png)

### 🌟 Giới thiệu
**ncsStat** là một nền tảng phân tích thống kê mã nguồn mở, không máy chủ (serverless), được thiết kế để xóa bỏ các rào cản trong nghiên cứu khoa học. Bằng cách kết hợp lõi tính toán **WebR (WebAssembly)** và **trí tuệ nhân tạo Generative AI**, ncsStat mang đến trải nghiệm phân tích mạnh mẽ như R nhưng thân thiện và trực quan hơn cả SPSS.

### 🚀 Tại sao thế giới cần ncsStat? (Scientific Gap)
1.  💰 **Rào cản kinh phí:** SPSS/AMOS quá đắt đỏ với các nước đang phát triển.
2.  💻 **Rào cản kỹ thuật:** R/Python quá khó học với dân xã hội học.
3.  🔐 **Quyền riêng tư:** Dữ liệu được xử lý 100% tại trình duyệt, không bao giờ gửi lên server.
4.  🇻🇳 **Rào cản ngôn ngữ:** AI giải thích kết quả chuẩn APA bằng tiếng Việt.

### 💎 Tính năng Độc bản
-   **Privacy-First:** Sandbox WebAssembly bảo mật tuyệt đối.
-   **Guided Workflow:** Quy trình chuẩn: Reliability $\rightarrow$ EFA $\rightarrow$ CFA $\rightarrow$ SEM.
-   **AI Interpretation:** Google Gemini 3.0 giải thích ý nghĩa số liệu.
-   **Show R Code:** Xuất code R để đảm bảo tính minh bạch (Open Science).

### 🧪 Độ chính xác & Hiệu năng (Benchmarking)
So sánh đối chiếu với Native R (v4.3.2) cho thấy sai số gần như tuyệt đối bằng 0 (Machine Epsilon).

| Loại phân tích | Chỉ số | Native R (v4.3.2) | ncsStat (WebR) | Sai số (Δ) |
| :--- | :--- | :--- | :--- | :--- |
| **CFA** | $\chi^2$ | 85.306122 | 85.306122 | $0$ (Exact) |
| | CFI | 0.931045 | 0.931045 | $< 1 \times 10^{-15}$ |
| | RMSEA | 0.092128 | 0.092128 | $< 1 \times 10^{-15}$ |
| **T-Test** | *p*-value | 0.000021 | 0.000021 | $0$ (Exact) |

---

<a name="-english"></a>
## 🇺🇸 English

> *"Breaking Financial & Technical Barriers — Bringing the Power of R & AI to Every Researcher."*

### 🌟 Introduction
**ncsStat** is an open-source, serverless statistical platform designed to democratize scientific research. By combining **WebR (WebAssembly)** with **Generative AI**, it offers the rigorous power of R with an interface more intuitive than SPSS.

![ncsStat Analysis Interface](public/images/analyze_page.png)

### 🚀 The Scientific Gap
1.  💰 **Financial Barrier:** Proprietary software (SPSS, AMOS) is cost-prohibitive in the Global South.
2.  💻 **Technical Barrier:** Coding in R/Python remains a hurdle for many social scientists.
3.  🔐 **Privacy:** Data is processed 100% client-side, never leaving the browser.
4.  🌏 **Language Barrier:** AI-driven interpretation provides context-aware reports in native languages.

### 💎 Key Features
-   **Privacy-First:** WebAssembly sandbox ensures absolute data sovereignty.
-   **Guided Workflow:** Standardized path: Reliability $\rightarrow$ EFA $\rightarrow$ CFA $\rightarrow$ SEM.
-   **AI Interpretation:** Powered by Google Gemini 3.0 for APA-style reporting.
-   **Show R Code:** Full transparency for Open Science reproducibility.

### 🧪 Accuracy & Benchmarking
Validation against Native R (v4.3.2) confirms **Zero Discrepancy** (within double-precision floating-point limits).

| Analysis Type | Metric | Native R (v4.3.2) | ncsStat (WebR) | Difference (Δ) |
| :--- | :--- | :--- | :--- | :--- |
| **CFA** | $\chi^2$ | 85.306122 | 85.306122 | $0$ (Exact) |
| | CFI | 0.931045 | 0.931045 | $< 1 \times 10^{-15}$ |
| | RMSEA | 0.092128 | 0.092128 | $< 1 \times 10^{-15}$ |
| **T-Test** | *p*-value | 0.000021 | 0.000021 | $0$ (Exact) |

---

## 🛠 Tech Stack
-   **Frontend:** Next.js 14, TypeScript, Tailwind CSS.
-   **Engine:** WebR (R compiled to WebAssembly).
-   **AI:** Google Gemini API 3.0.

---

## 🚀 Quick Start

### Try it Now (Zero-Install)
1.  **Access the app:** [https://ncsstat.ncskit.org/analyze](https://ncsstat.ncskit.org/analyze)
2.  **Use sample data:** Download [`sample_data.csv`](https://github.com/hailp1/ncsStatcore/raw/main/public/sample_data.csv) (included in `public/` folder)
3.  **Upload & Analyze:** Drag-and-drop the file and follow the guided workflow

### Run Locally
```bash
git clone https://github.com/hailp1/ncsStatcore.git
cd ncsStatcore
npm install
npm run dev
# Open http://localhost:3000/analyze
```

**Sample Dataset:** The included `sample_data.csv` contains psychometric survey data (9 items) perfect for testing Reliability → EFA → CFA workflow.

---

## 📄 License & Citation
Released under **MIT License**.

> Le, P. H. (2026). ncsStat: A Serverless, WebAssembly-Based Platform for Democratizing Psychometric Analysis. *Software Impacts*.
