from flask import Flask, request, jsonify
import openai
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)
# Set up OpenAI API
openai.api_key = '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'
model_id = 'gpt-3.5-turbo'
def generate_email_content(messages):
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages,
        max_tokens= 500
    )
    return response.choices[0].message['content']

@app.route('/generate_emails', methods=['POST'])


def generate_emails():
    data = request.json  # Get data from the POST request

    # Collect user input data
    campaign_goal = data.get('campaign_goal', '')
    brand_tone = data.get('brand_tone', '')
    industry = data.get('industry', '')
    highlights = data.get('highlights', '')

    # Prepare inputs for chat model
    system_message = "System: You are a helpful email marketing assistant."
    user_message = f"User: Subject: {campaign_goal} for {industry}\n\n"
    user_message += f"Hello,\n\nWe are excited to {campaign_goal.lower()} in the {industry} industry. Our {brand_tone.lower()} tone "
    user_message += f"aims to {highlights}. Whether you are a {industry} expert or just getting started, our team is here to help. "
    user_message += "Read on to discover more about our latest offerings and how they can benefit you...\n\n"

    email_templates = []
    for i in range(5):
        conversation = [{"role": "system", "content": system_message}, {"role": "user", "content": user_message}]
        template = generate_email_content(conversation)
        email_templates.append(template)

    return jsonify({"email_templates": email_templates})
if __name__ == '__main__':
    app.run()
