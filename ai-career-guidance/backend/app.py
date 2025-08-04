import os
from dotenv import load_dotenv  # <-- Add this line

load_dotenv()  # <-- Add this line

import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
# Get your free API key from Google AI Studio: https://makersuite.google.com/app/apikey
# It's recommended to set this as an environment variable for security.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set. Please get your key from Google AI Studio.")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
CORS(app)  # This enables Cross-Origin Resource Sharing

def generate_guidance_from_logic(data):
    """
    This function replicates the original hardcoded logic from your React application.
    """
    skills = data.get("skills", [])
    interests = data.get("interests", [])
    education = data.get("education", "")
    goal = data.get("goal", "")

    job_roles = []
    resume_tips = []
    next_steps = []

    # Generate job roles based on interests and skills
    if "Web Development" in interests or any("web" in s.lower() for s in skills):
        job_roles.extend(["Frontend Developer", "Full Stack Developer", "Web Designer"])
    if "Data Science" in interests or any(s.lower() in ["python", "data"] for s in skills):
        job_roles.extend(["Data Analyst", "Data Scientist", "Machine Learning Engineer"])
    if "Cybersecurity" in interests:
        job_roles.extend(["Security Analyst", "Penetration Tester", "Security Consultant"])
    if "Artificial Intelligence" in interests or any(s.lower() in ["ai", "machine learning"] for s in skills):
        job_roles.extend(["AI Engineer", "ML Research Scientist", "AI Product Manager"])

    # Default fallback roles
    if not job_roles:
        job_roles.extend(["Software Developer", "Technical Analyst", "IT Consultant"])

    # Generate resume tips
    if skills:
        resume_tips.append(f"Highlight your {', '.join(skills[:3])} skills prominently in your skills section.")
    resume_tips.extend([
        "Include quantifiable achievements and project outcomes.",
        "Tailor your resume to match job descriptions in your target field.",
        "Add relevant certifications and continuous learning initiatives."
    ])
    if goal == "internship":
        resume_tips.append("Emphasize your academic projects and any practical experience.")
    elif goal == "job":
        resume_tips.append("Focus on professional experience and measurable results.")

    # Generate next steps
    if education in ["high-school", "diploma"]:
        next_steps.append("Consider pursuing relevant certifications or a degree program.")
    next_steps.extend([
        "Build a portfolio showcasing your projects and skills.",
        "Network with professionals in your field of interest.",
        "Apply for relevant positions on job portals and company websites.",
        "Continuously update your skills through online courses and practice."
    ])
    if goal == "higher-studies":
        next_steps.extend([
            "Research graduate programs aligned with your interests.",
            "Prepare for entrance exams if required."
        ])

    return {
        "jobRoles": list(set(job_roles)), # Use set to remove duplicates
        "resumeTips": resume_tips,
        "nextSteps": next_steps
    }


@app.route("/generate-guidance", methods=["POST"])
def generate_guidance():
    """
    API endpoint to generate career guidance.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON"}), 400

        # 1. Get the base suggestions from the original logic
        base_results = generate_guidance_from_logic(data)

        # 2. Create a prompt for the Gemini API to enhance the results
        prompt = f"""
        A career guidance tool generated the following suggestions based on a user's input.
        Please enhance and expand upon these suggestions. Make them more insightful, personalized, and actionable.

        User's Profile:
        - Skills: {', '.join(data.get("skills", ["Not provided"]))}
        - Interests: {', '.join(data.get("interests", ["Not provided"]))}
        - Education: {data.get("education", "Not provided")}
        - Goal: {data.get("goal", "Not provided")}

        Initial Suggestions:
        - Job Roles: {', '.join(base_results["jobRoles"])}
        - Resume Tips: {'; '.join(base_results["resumeTips"])}
        - Next Steps: {'; '.join(base_results["nextSteps"])}

        Your Task:
        Rewrite and expand these suggestions. Provide at least 5 job roles, 5 resume tips, and 5 next steps.
        Return the response as a JSON object with the keys "jobRoles", "resumeTips", and "nextSteps".
        The values for these keys should be arrays of strings.
        Do not include any other text or formatting in your response.
        """

        # 3. Call the Gemini API
        response = model.generate_content(prompt)

        # 4. Parse the response from Gemini
        # The Gemini API response might be in a markdown format, so we clean it up.
        import json
        clean_response = response.text.strip().replace("```json", "").replace("```", "")
        ai_results = json.loads(clean_response)


        return jsonify(ai_results)

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to generate AI suggestions."}), 500


@app.route("/health", methods=["GET"])
def health_check():
    """
    Health check endpoint to verify the server is running.
    """
    return jsonify({"status": "healthy", "message": "AI Career Guidance API is running!"})


if __name__ == "__main__":
    print("🚀 Starting AI Career Guidance Backend Server...")
    print("📍 Server will be available at: http://127.0.0.1:5001")
    print("🔗 Health check: http://127.0.0.1:5001/health")
    print("📝 API endpoint: http://127.0.0.1:5001/generate-guidance")
    app.run(debug=True, host="127.0.0.1", port=5001)