from flask import Flask, request
app = Flask(__name__)

@app.route('/data', methods=['POST'])
def process_data():
    data = request.get_json() 
    # Add your Python code here that processes the data.
    # You can access the data sent in the request with the 'data' variable.
    # Let's say we return the same data for this example.
    return data

if __name__ == '__main__':
    app.run(port=5000)  # The Flask app will run on port 5000.
