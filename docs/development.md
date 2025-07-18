# **Project Iris: Development Plan**
*The Holy Bible for Project Iris Development*

## **📝 Latest Updates & Decisions**

### **July 18, 2025**
- **MAJOR DECISION**: Story-centric approach instead of generic "projects"
- **MAJOR DECISION**: Web-first development, mobile companion app later (V1.1+)
- **MAJOR DECISION**: Frontend: Next.js 15 + TypeScript + TanStack Query
- **MAJOR DECISION**: Backend: Fastify + Node.js + TypeScript (separate from frontend)
- **MAJOR DECISION**: Database: Supabase (managed PostgreSQL + auth + storage)
- **IMPLEMENTATION**: Story-centric database schema with 5 states (LEAD → RESEARCH → ANALYSIS → WRITING → PUBLISHED)
- **IMPLEMENTATION**: Complete file type support (documents, audio, images, web clips, notes)
- **IMPLEMENTATION**: Flexible annotation system with highlights, notes, bookmarks, quotes, evidence
- **RATIONALE**: Stories are how journalists think - more intuitive than "projects"
- **RATIONALE**: Complex features (knowledge graphs, multi-document analysis) work better on web/desktop
- **RATIONALE**: TanStack Query for better server state management than Zustand
- **RATIONALE**: Fastify for better performance than Express, separate backend for scalability
- **RATIONALE**: Supabase provides managed PostgreSQL + built-in auth + file storage + real-time features

### **Core Product Vision Update**
- **Primary Unit**: "Story" (not "project") - each investigation is a living story workspace
- **Content Flow**: Everything flows into the story context - interviews, documents, web clips, notes
- **AI Story Intelligence**: AI understands story context and organizes content accordingly
- **Story Evolution**: Lead → Research → Analysis → Writing → Published

### **Story States Defined**
1. **Lead**: Initial idea, minimal content
2. **Research**: Gathering evidence, interviews  
3. **Analysis**: Finding connections, building narrative
4. **Writing**: Drafting the story
5. **Published**: Final piece completed

### **Story Dashboard Concept**
- Story progress tracker
- Key evidence highlighted  
- Missing pieces identified
- Timeline of events
- Character/entity network

---

## **Version Breakdown & Release Strategy**

### **V0.1 - Foundation (MVP)**
*Goal: Prove core concept with basic STORY management and file handling*

**Features:**
- Basic story creation and management (NOT projects - STORIES!)
- File upload (documents, audio, text) into stories
- Simple file organization and listing within story context
- Basic text search within uploaded documents
- Minimal UI with clean design focused on story workflow
- Story states: Lead → Research → Analysis → Writing → Published

**Technical Foundation:**
- Frontend: React/Next.js with TypeScript
- Backend: Node.js/Express with TypeScript
- Database: PostgreSQL for metadata, file storage strategy
- Authentication: Basic user accounts
- File storage: Local filesystem initially

### **V0.2 - AI Integration Basics**
*Goal: Add core AI capabilities to demonstrate value*

**Features:**
- Audio transcription (using Whisper API or similar)
- OCR for PDF documents
- Basic semantic search across all content
- Simple tagging system
- Text highlighting and annotations

**Technical Additions:**
- AI service integration (OpenAI, Anthropic, or open-source alternatives)
- Vector database for semantic search (Pinecone, Weaviate, or Chroma)
- Text processing pipeline
- Enhanced search backend

### **V0.3 - Analysis Tools**
*Goal: Provide valuable analysis capabilities*

**Features:**
- Entity recognition (people, organizations, locations)
- Date/time extraction for timeline view
- Basic knowledge graph visualization
- Enhanced tagging and categorization
- Search filters and advanced queries

**Technical Additions:**
- NLP pipeline for entity extraction
- Graph database or graph visualization library
- Timeline component
- Advanced search indexing

### **V1.0 - Full Workbench**
*Goal: Complete journalist workbench with all core features*

**Features:**
- Integrated writing environment
- Smart quote insertion and citation
- Export functionality (Word, Markdown, PDF)
- Full knowledge graph with interactive exploration
- Advanced timeline with event correlation
- Web content clipping (browser extension)
- Enhanced security and encryption

**Technical Additions:**
- Rich text editor integration
- Browser extension development
- Export/import pipeline
- End-to-end encryption implementation
- Performance optimization
- Comprehensive testing suite

### **V1.1+ - Polish & Scale**
*Goal: Production-ready application*

**Features:**
- Advanced collaboration features
- Mobile companion app
- Enhanced AI research assistant
- Advanced source analysis
- Team/organization features
- Comprehensive API

---

## **Development Tasks (Prioritized)**

### **Phase 1: Foundation Setup**
1. **Project Architecture Setup**
   - Initialize Next.js project with TypeScript
   - Set up PostgreSQL database
   - Configure development environment (Docker)
   - Set up CI/CD pipeline basics

2. **Core Data Models**
   - Design database schema for STORIES, files, users (story-centric!)
   - Story schema: id, title, state, created_at, updated_at, user_id, description
   - Create migration scripts
   - Set up ORM/database layer

3. **Basic UI Framework**
   - Implement design system/component library
   - Create basic layouts and navigation
   - Set up authentication flow

4. **Story Management Core**
   - Create story CRUD operations (Create, Read, Update, Delete stories)
   - Story state management (Lead → Research → Analysis → Writing → Published)
   - File upload and storage system within story context
   - Basic file listing and organization per story

### **Phase 2: File Processing**
1. **File Upload Pipeline**
   - Implement secure file upload with validation
   - Create file processing queue system
   - Add file metadata extraction

2. **Text Processing**
   - Implement OCR for PDFs
   - Add document text extraction
   - Create search indexing system

3. **Audio Processing**
   - Integrate transcription service
   - Add audio file handling
   - Implement speaker identification

### **Phase 3: Search & Analysis**
1. **Search System**
   - Implement full-text search
   - Add semantic search capabilities
   - Create advanced search filters

2. **Annotation System**
   - Build text highlighting functionality
   - Create tagging system
   - Add annotation persistence

3. **Entity Processing**
   - Implement entity recognition
   - Add date/time extraction
   - Create entity relationship mapping

### **Phase 4: Visualization & Analysis**
1. **Timeline View**
   - Create interactive timeline component
   - Add event correlation
   - Implement timeline filtering

2. **Knowledge Graph**
   - Build graph visualization
   - Add interactive exploration
   - Create entity relationship views

3. **Advanced Analytics**
   - Add content analysis tools
   - Implement trend detection
   - Create insight generation

### **Phase 5: Writing & Export**
1. **Writing Environment**
   - Integrate rich text editor
   - Add smart quote insertion
   - Create source referencing system

2. **Export System**
   - Implement multiple export formats
   - Add citation generation
   - Create document templates

3. **Browser Extension**
   - Build web clipping extension
   - Add content import pipeline
   - Create bookmark/note system

### **Phase 6: Security & Performance**
1. **Security Implementation**
   - Add end-to-end encryption
   - Implement secure file storage
   - Add audit logging

2. **Performance Optimization**
   - Optimize database queries
   - Add caching layers
   - Implement lazy loading

3. **Testing & Quality**
   - Create comprehensive test suite
   - Add performance monitoring
   - Implement error tracking

---

## **Technical Architecture Decisions**

### **Frontend Stack** ✅ FINALIZED
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Server State**: TanStack Query (React Query)
- **Client State**: React useState/useReducer (minimal client state)
- **Components**: Shadcn/ui (built on Radix UI)
- **Charts/Graphs**: D3.js or Recharts (TBD)

### **Backend Stack** ✅ FINALIZED  
- **Runtime**: Node.js
- **Framework**: Fastify (initialized with: `fastify generate backend --lang=ts`)
- **Language**: TypeScript
- **Database**: Supabase (managed PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage (instead of AWS S3)
- **Queue System**: Redis + Bull (for file processing)

### **AI/ML Services** ⏳ PENDING DISCUSSION
- **Transcription**: TBD (awaiting senior discussion)
- **OCR**: TBD (awaiting senior discussion)
- **Embeddings**: TBD (awaiting senior discussion)
- **Vector DB**: TBD (awaiting senior discussion)
- **Entity Recognition**: TBD (awaiting senior discussion)

### **Development Tools**
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Monitoring**: Sentry for errors
- **Analytics**: Self-hosted or privacy-focused solution

---

## **Success Metrics**

### **V0.1 Metrics**
- User can create stories and upload files into story context
- Basic search functionality works within stories
- Clean, responsive UI with story-focused workflow
- Story state transitions work smoothly

### **V0.2 Metrics**
- Audio transcription accuracy >95%
- OCR accuracy >90%
- Search results returned in <2 seconds

### **V1.0 Metrics**
- Can handle stories with 1000+ documents each
- Full feature set functional within story context
- User onboarding <5 minutes (story creation to first upload)
- Export functionality works seamlessly for complete stories

---

## **Risk Assessment**

### **Technical Risks**
- **AI API Dependencies**: Mitigate with multiple providers and fallbacks
- **Performance at Scale**: Early performance testing and optimization
- **Security Vulnerabilities**: Regular security audits and best practices

### **Product Risks**
- **User Adoption**: Early user feedback and iterative development
- **Feature Complexity**: Phased rollout with MVP focus
- **Competition**: Unique value proposition and superior UX

### **Business Risks**
- **Cost of AI Services**: Monitor usage and optimize costs
- **Regulatory Compliance**: Stay updated on data protection laws
- **Scaling Challenges**: Plan infrastructure scaling early

---

## **📋 Development Status & Next Steps**

### **Current Status: Full Stack Complete ✅**
- ✅ Requirements analysis complete
- ✅ Story-centric approach defined
- ✅ Technical architecture planned
- ✅ Development roadmap created
- ✅ Frontend: Next.js 15 + TypeScript + Tailwind initialized
- ✅ Backend: Fastify + TypeScript generated
- ✅ Database: Prisma + Supabase schema designed
- ✅ Supabase client libraries installed in both frontend and backend
- ✅ Environment files configured for Supabase
- ✅ Story CRUD API endpoints implemented
- ✅ User management API endpoints implemented
- ✅ CORS configuration added
- ✅ Supabase project created and connected (fzyweoxngmrndvfqvryt)
- ✅ Database migration successful - all tables created
- ✅ Prisma client generated and working
- ✅ Backend server running on http://localhost:3000
- ✅ API endpoints tested and working (users, stories, story states)
- ✅ Frontend: TanStack Query setup complete
- ✅ Frontend: API service layer implemented
- ✅ Frontend: Story management UI components built
- ✅ Frontend: Story dashboard page created
- ✅ Frontend: Story creation modal implemented
- ✅ Frontend: Story state management UI working
- ✅ Frontend running on http://localhost:3001
- 🎯 V0.1 MVP Complete - Ready for testing and iteration
- 🚀 **V0.2 - File Upload & Management** - Complete ✅

### **V0.2 Features Complete ✅**
- ✅ **File Upload System**: Drag & drop file upload with support for documents, audio, and images
- ✅ **Supabase Storage Integration**: Files organized by story in `iris-files` bucket
- ✅ **File Management UI**: File list with preview, download, and delete capabilities
- ✅ **Story Detail Page**: Dedicated page for each story with file management
- ✅ **File API Endpoints**: Complete CRUD operations for files
- ✅ **File Organization**: Story-specific file organization and metadata
- ✅ **File Type Support**: Documents (PDF, DOCX, TXT), Audio (MP3, WAV, M4A), Images (JPG, PNG)
- ✅ **Progress Indicators**: Upload progress and loading states
- ✅ **Error Handling**: Graceful error handling for uploads and operations

### **V0.2 Development Plan - File Upload & Management**

**Goal**: Enable journalists to upload and manage files within their stories

**Features to Build:**
1. **File Upload System**
   - Drag & drop file upload
   - Support for documents (PDF, DOCX, TXT)
   - Support for audio files (MP3, WAV, M4A)
   - Support for images (JPG, PNG)
   - File validation and size limits

2. **File Storage & Organization**
   - Supabase Storage integration
   - Story-specific file organization
   - File metadata extraction
   - File thumbnails/previews

3. **File Management UI**
   - File list view within story context
   - File upload progress indicators
   - File deletion with confirmation
   - File download capabilities

4. **Database Updates**
   - Update File model with storage paths
   - Add file metadata fields
   - File-to-story relationships

**Technical Implementation:**
- Backend: File upload API with Supabase Storage
- Frontend: File upload components with progress
- Storage: Supabase buckets for organized file storage
- Processing: Basic file metadata extraction

### **Next Immediate Steps**
1. Set up Supabase Storage buckets
2. Create file upload API endpoints
3. Build file upload UI components
4. Implement file management within stories
5. Add file preview capabilities

### **Supabase Benefits for Project Iris**
- **Managed PostgreSQL**: No database setup/maintenance
- **Built-in Authentication**: User management out of the box
- **File Storage**: Perfect for documents, audio files, images
- **Real-time Features**: Live collaboration potential for V2.0
- **Row Level Security**: Perfect for journalist data protection
- **Edge Functions**: Serverless functions for AI processing
- **Dashboard**: Easy database management and monitoring

### **Key Reminders**
- **ALWAYS** think in terms of "stories" not "projects"
- **ALWAYS** update this document when making decisions
- **ALWAYS** consider story context for all features
- **MOBILE** comes later - focus on web first
- **SECURITY** is non-negotiable from day 1

---

## **🔧 Troubleshooting Guide**

### **File Upload Issues**

**Problem**: Files not uploading, "JWS Protected Header is invalid" error
**Solution**: 
1. Verify correct `service_role` key (not `anon` key) in backend `.env`
2. Service key should start with `eyJ` and be very long
3. Copy key exactly without extra characters or line breaks
4. Restart backend after updating `.env`
5. Make Storage bucket public or set up correct RLS policies

**Problem**: Files upload but don't appear in UI
**Solution**: 
1. Check browser console for errors
2. Verify story ID is correct
3. Check if files appear in Supabase Storage dashboard
4. Refresh the page or navigate back to story

**Problem**: CORS errors when uploading files
**Solution**: 
1. Verify frontend is running on port 3001
2. Check backend CORS configuration includes `http://localhost:3001`
3. Restart both frontend and backend servers