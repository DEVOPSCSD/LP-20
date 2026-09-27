import sys
import os

# Add backend folder to Python path
sys.path.insert(
    0,
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from app import app


def test_home():

    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200

    assert b"Lost and Found Backend is Running!" in response.data


def test_register_missing_fields():

    client = app.test_client()

    response = client.post(
        "/api/register",
        json={}
    )

    assert response.status_code == 400


def test_login_missing_fields():

    client = app.test_client()

    response = client.post(
        "/api/login",
        json={}
    )

    assert response.status_code == 400


def test_add_item_missing_fields():

    client = app.test_client()

    response = client.post(
        "/api/items",
        json={}
    )

    assert response.status_code == 400


def test_get_items():

    client = app.test_client()

    response = client.get("/api/items")

    assert response.status_code == 200
