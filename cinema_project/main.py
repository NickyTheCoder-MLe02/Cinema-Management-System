from db_connection import create_connection
import operations

def display_menu():
    print("\n" + "*"*40)
    print("      CINEMA MANAGEMENT SYSTEM      ")
    print("*"*40)
    print("1. View Available Movies")
    print("2. Book a Ticket")
    print("3. View Daily Screenings Report")
    print("4. Cancel a Ticket")
    print("5. Exit")
    print("*"*40)

def main():
    conn = create_connection()
    
    if not conn:
        print("Application failed to start due to database connection error.")
        return

    print("Database connected successfully!")

    while True:
        display_menu()
        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            operations.show_movies(conn)
        elif choice == '2':
            operations.book_ticket(conn)
        elif choice == '3':
            operations.generate_report(conn)
        elif choice == '4':
            operations.cancel_ticket(conn)
        elif choice == '5':
            print("\nClosing connection...")
            conn.close()
            break
        else:
            print("\nInvalid choice. Please enter a number between 1 and 5.")

if __name__ == '__main__':
    main()