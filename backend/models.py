from database import get_db_connection


def create_user(name, email, password):
    connection = get_db_connection()

    connection.execute(
        """
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
        """,
        (name, email, password)
    )

    connection.commit()
    connection.close()


def get_user(email, password):
    connection = get_db_connection()

    user = connection.execute(
        """
        SELECT * FROM users
        WHERE email = ? AND password = ?
        """,
        (email, password)
    ).fetchone()

    connection.close()

    return user


def create_item(title, description, category, location, date, item_type):
    connection = get_db_connection()

    connection.execute(
        """
        INSERT INTO items
        (title, description, category, location, date, type)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            title,
            description,
            category,
            location,
            date,
            item_type
        )
    )

    connection.commit()
    connection.close()


def get_all_items():
    connection = get_db_connection()

    items = connection.execute(
        """
        SELECT * FROM items
        ORDER BY id DESC
        """
    ).fetchall()

    connection.close()

    return items
