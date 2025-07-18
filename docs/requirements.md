# **Project Iris: The Journalist's Workbench**

## **Product Requirements Document (PRD)**

* **Version:** 1.0  
* **Date:** July 17, 2025  
* **Status:** Scoping & Definition  
* **Author:** Gemini AI & Project Lead

## **1\. Introduction & Vision**

### **1.1. The Problem Statement**

Journalists, academic researchers, and non-fiction authors work by uncovering narratives hidden within vast amounts of unstructured information. Their current workflow is fragmented and manual. It involves juggling audio recorders, transcription services, word processors, PDF readers, and note-taking apps. This leads to wasted time, lost context, and a high cognitive load, hindering their ability to find connections and tell compelling, fact-based stories.

### **1.2. The Product Vision**

To become the indispensable, secure, and intelligent operating system for investigative storytellers. **Project Iris** will transform the chaotic process of research and investigation into a seamless, insightful workflow, empowering users to uncover truth and construct powerful narratives faster and more effectively than ever before.

### **1.3. Target Audience (User Personas)**

1. **The Investigative Journalist:** Works on long-form stories under tight deadlines. Deals with sensitive sources and data. Needs speed, security, and powerful analysis tools.  
2. **The Academic Researcher:** Works on deep, multi-year projects. Deals with vast archives of academic papers, historical documents, and interview data. Needs robust organization, citation, and timeline tools.  
3. **The Non-Fiction Author / Biographer:** Crafts book-length narratives. Deals with a wide array of sources (letters, diaries, interviews). Needs tools to manage complexity and build a coherent story arc over a long period.

## **2\. Core Features & Functionality (V1.0)**

This section details the features required for the final version 1.0 of the application. They are organized into **Epics**, which are large bodies of work, and **User Stories**, which describe a specific feature from a user's perspective.

### **EPIC 1: The Project Hub & Universal Ingestion**

*The foundation of the app. A secure, centralized space for each investigation.*

* **User Story 1.1: Project Management**  
  * As a user, I want to create, name, and organize separate projects for each story or research topic I'm working on, so my investigations remain isolated and organized.  
* **User Story 1.2: Multi-Format Data Ingestion**  
  * As a user, I want to upload various file types into my project, including audio files (.mp3, .wav, .m4a), documents (.pdf, .docx, .txt), and plain text notes, so all my research lives in one place.  
* **User Story 1.3: Web Content Clipping**  
  * As a user, I want a browser extension to clip and import web articles directly into my project, preserving the text content for analysis.

### **EPIC 2: AI-Powered Data Processing**

*The initial "magic" where raw data is transformed into structured, usable information.*

* **User Story 2.1: Automated Transcription**  
  * As a user, when I upload an audio file, I want the system to automatically transcribe it with high accuracy, providing timestamps and identifying different speakers (Speaker A, Speaker B).  
* **User Story 2.2: Document Text Recognition (OCR)**  
  * As a user, when I upload a PDF (even a scan of a document), I want the system to perform Optical Character Recognition (OCR) to make the entire document's text searchable and analyzable.

### **EPIC 3: The Analysis Workbench**

*The core of the application where users find insights and connections.*

* **User Story 3.1: Universal Semantic Search**  
  * As a user, I want to perform a single search query that looks across *all* documents, transcripts, and notes in my project, so I can find information instantly.  
  * The search must be **semantic**, meaning it understands intent (e.g., a search for "corporate wrongdoing" should find documents that mention "financial fraud" or "embezzlement").  
* **User Story 3.2: Tagging and Annotation**  
  * As a user, I want to be able to highlight any piece of text (in a document or transcript) and apply custom tags (e.g., key\_evidence, character\_background, follow\_up\_needed), so I can organize my findings thematically.  
* **User Story 3.3: The Knowledge Graph (Visualizer)**  
  * As a user, I want the system to automatically identify key entities (people, organizations, locations) and visualize their relationships in an interactive graph, so I can instantly see who is connected to whom and in what context.  
* **User Story 3.4: Interactive Timeline View**  
  * As a user, I want the system to automatically detect all dates and times mentioned in my documents and display them on a chronological, interactive timeline, so I can easily understand the sequence of events.

### **EPIC 4: The Storytelling Studio**

*Tools that help bridge the gap from research to final draft.*

* **User Story 4.1: Integrated Writing Environment**  
  * As a user, I want a clean, distraction-free writing editor within the app, so I can draft my story right next to my research materials.  
* **User Story 4.2: The Quote Finder ("Smart Cite")**  
  * As a user, while writing my draft, I want to be able to instantly search for and insert relevant quotes or text snippets from my source documents and interviews without leaving the editor.  
* **User Story 4.3: Export & Citation**  
  * As a user, I want to be able to export my final draft in common formats (.docx, .md, .txt) and generate a list of all sources used in the document.

## **3\. Non-Functional Requirements**

* **3.1. Security:** This is non-negotiable. The system must feature **end-to-end encryption**. Data must be encrypted at rest and in transit. User anonymity and source protection are paramount.  
* **3.2. Performance:** The UI must be fast and responsive. Transcription of a 1-hour audio file should take no more than a few minutes. Search results across a large project should be near-instantaneous.  
* **3.3. Usability:** The interface must be clean, intuitive, and require minimal onboarding. The user is a writer/researcher, not necessarily a tech expert.  
* **3.4. Scalability:** The application must be able to handle projects with thousands of documents and hundreds of hours of audio without performance degradation.

## **4\. Monetization Strategy (V1.0)**

A Freemium model to encourage adoption:

1. **Free Tier:** Limited projects, storage (e.g., 5GB), and monthly transcription hours (e.g., 2 hours).  
2. **Pro Tier (for Individuals):** Monthly/annual subscription with significantly higher limits, access to advanced features like the Knowledge Graph.  
3. **Team Tier (for Newsrooms):** Per-seat pricing with collaborative features, shared projects, and centralized billing.

## **5\. Future Roadmap (V2.0 and Beyond)**

* **AI Research Assistant:** Proactively suggest new research angles or identify gaps in existing research.  
* **Collaboration Features:** Allow real-time collaborative editing and commenting on documents and projects.  
* **Advanced Source Analysis:** AI-powered tools to help assess the potential bias or sentiment of a source document.  
* **Mobile Companion App:** A simple app for recording interviews on-the-go and uploading them directly to a project.