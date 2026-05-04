import mysql.connector
from mysql.connector import Error

def create_connection():
    """Establish connection to the MySQL database."""
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='CinemaManagement',
            user='MinhLeDuc',
            password='123456'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: '{e}'")
        return None