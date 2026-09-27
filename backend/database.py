import sqlite3

DATABASE = "lost_and_found.db"


def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_db_connection()

    # Users table
    connection.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    # Lost and Found items table
    connection.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT,
            location TEXT,
            date TEXT,
            type TEXT NOT NULL,
            status TEXT DEFAULT 'Active'
        )
    """)

    connection.commit()
    connection.close()
