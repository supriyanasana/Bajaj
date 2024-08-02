from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

@app.route('/bfhl', methods=['POST'])
def post_data():
    try:
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = [max(alphabets, key=lambda x: x.lower())] if alphabets else []

        response = {
            "is_success": True,
            "user_id": "supriya_nasana_27042003",  
            "email": "supriya_nasana@srmap.edu.in",
            "roll_number": "AP21110010862",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(port=5000)
