from flask import Blueprint, request, jsonify
import sqlite3

from models import (
    create_user,
    get_user,
    create_item,
    get_all_items
)

api = Blueprint("api", __name__)


# -------------------------
# REGISTER
# -------------------------

@api.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request data is required"
        }), 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    try:
        create_user(name, email, password)

        return jsonify({
            "message": "Registration successful"
        }), 201

    except sqlite3.IntegrityError:
        return jsonify({
            "message": "Email already exists"
        }), 400


# -------------------------
# LOGIN
# -------------------------

@api.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request data is required"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    user = get_user(email, password)

    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        }), 200

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# -------------------------
# ADD LOST / FOUND ITEM
# -------------------------

@api.route("/items", methods=["POST"])
def add_item():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request data is required"
        }), 400

    title = data.get("title")
    description = data.get("description")
    category = data.get("category")
    location = data.get("location")
    date = data.get("date")
    item_type = data.get("type")

    if not title or not item_type:
        return jsonify({
            "message": "Title and type are required"
        }), 400

    if item_type not in ["Lost", "Found"]:
        return jsonify({
            "message": "Type must be Lost or Found"
        }), 400

    create_item(
        title,
        description,
        category,
        location,
        date,
        item_type
    )

    return jsonify({
        "message": "Item added successfully"
    }), 201


# -------------------------
# GET ALL ITEMS
# -------------------------

@api.route("/items", methods=["GET"])
def get_items():

    items = get_all_items()

    result = []

    for item in items:
        result.append(dict(item))

    return jsonify(result), 200