# AI Career Guidance Backend

## Setup

1. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Create a `.env` file in this folder with:
     ```
     GEMINI_API_KEY=your_google_gemini_api_key
     ```

5. **Run the backend:**
   ```
   python app.py
   ```

## API

- **POST** `/generate-guidance`  
  Expects JSON with `skills`, `interests`, `education`, and `goal`.