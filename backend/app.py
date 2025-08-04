from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

@app.route('/generate-message', methods=['POST'])
def generate_message():
    data = request.json
    
    # Create a prompt based on the received data
    prompt = f"""Create a heartfelt {data['occasion']} message from {data['sender']} to {data['receiver']}.
    Include this memory: {data['memory']}
    Inside joke: {data['inside_joke']}
    Make it personal and emotional."""
    
    try:
        # Generate message using OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a creative writer specializing in personal greetings."},
                {"role": "user", "content": prompt}
            ]
        )
        
        message = response.choices[0].message.content
        
        # For now, return a static image URL (you can implement proper image generation later)
        image_url = "https://placeholder.com/ghibli-style-greeting"
        
        return jsonify({
            "message": message,
            "image": image_url
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
