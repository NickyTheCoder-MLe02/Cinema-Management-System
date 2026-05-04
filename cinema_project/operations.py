from mysql.connector import Error

def show_movies(connection):
    """Fetch and display all movies from the database."""
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Movies;")
        records = cursor.fetchall()
        
        print("\n" + "="*50)
        print("                 AVAILABLE MOVIES")
        print("="*50)
        print(f"{'ID':<5} | {'Title':<25} | {'Genre':<10}")
        print("-" * 50)
        for row in records:
            print(f"{row[0]:<5} | {row[1]:<25} | {row[2]:<10}")
        print("="*50 + "\n")
        
        cursor.close()
    except Error as e:
        print(f"Error fetching movies: '{e}'")

def book_ticket(connection):
    """Handle seat booking using the BookTicket stored procedure."""
    print("\n--- BOOK A TICKET ---")
    try:
        customer_id = int(input("Enter Customer ID (e.g., 1): "))
        screening_id = int(input("Enter Screening ID (e.g., 1): "))
        seat_number = input("Enter Seat Number (e.g., A1): ")

        cursor = connection.cursor()
        cursor.callproc('BookTicket', [customer_id, screening_id, seat_number])
        connection.commit()
        
        print("\nSUCCESS: Ticket booked successfully!")
        cursor.close()
    except Error as e:
        print(f"\nFAILED: Database Error - {e}")
    except ValueError:
        print("\nInvalid input. Please enter valid numbers.")

def generate_report(connection):
    """Generate daily screening report using the DailyScreeningsSummary view."""
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM DailyScreeningsSummary;")
        records = cursor.fetchall()
        
        print("\n" + "="*80)
        print("                          DAILY SCREENINGS REPORT")
        print("="*80)
        print(f"{'Date':<12} | {'Time':<10} | {'Movie':<20} | {'Room':<10} | {'Capacity'}")
        print("-" * 80)
        for row in records:
            date_str = row[0].strftime('%Y-%m-%d')
            time_str = str(row[1])
            print(f"{date_str:<12} | {time_str:<10} | {row[2]:<20} | {row[3]:<10} | {row[4]}")
        print("="*80 + "\n")
        
        cursor.close()
    except Error as e:
        print(f"Error generating report: '{e}'")

def cancel_ticket(connection):
    """Handle ticket cancellation using the CancelTicket stored procedure."""
    print("\n--- CANCEL A TICKET ---")
    try:
        ticket_id = int(input("Enter the Ticket ID you want to cancel: "))

        cursor = connection.cursor()
        cursor.callproc('CancelTicket', [ticket_id])
        connection.commit()
        
        print("\nSUCCESS: Ticket cancelled successfully! Seat is now available.")
        cursor.close()
    except Error as e:
        print(f"\nFAILED: Database Error - {e}")
    except ValueError:
        print("\nInvalid input. Please enter a valid Ticket ID number.")