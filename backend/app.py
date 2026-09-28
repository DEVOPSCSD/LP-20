from flask import Flask
from flask_cors import CORS
from database import init_db
from routes import api

app = Flask(__name__)

# Allow frontend to communicate with backend
CORS(app)

# Register API routes
app.register_blueprint(api, url_prefix="/api")


@app.route("/")
def home():
    return "Lost and Found Backend is Running!"


if __name__ == "__main__":
    init_db()
<<<<<<< HEAD
    app.run(debug=True)
=======
    app.run(debug=True)
>>>>>>> 381f6def5da9f70cbbb29e65632f04e87c4b6e84
