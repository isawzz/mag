from flask import Flask

# Initialize the Flask app
app = Flask(__name__)

# Define routes
@app.route('/')
def hello_world():
    return 'Hello, Flask via WSGI!'

# Optional: Debugging mode when running locally
if __name__ == '__main__':
    app.run(debug=True)
