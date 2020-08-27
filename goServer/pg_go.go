package main

import (
        "context"
        "fmt"
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

type Puser struct {
	id          string `json:"id"` // primary key
	first_name   string `json:"first_name"`
	last_name    string `json:"last_name"`
	company_name string `json:"company_name"`
	email       string `json:"email"`
	tel         string `json:"tel"`
}

type Pusers []Puser

var (
        pusers []Puser
        ctx context.Context
)
func main() {

	connStr := "user=postgres password=pwd dbname=pusers sslmode=require"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
        rows, err := db.Query("SELECT * FROM users")
        // https://github.com/golang/go/wiki/SQLInterface
        defer rows.Close()
	if err != nil {
		log.Fatal(err)
	}
	var myuser Puser
	// https://www.calhoun.io/querying-for-a-single-record-using-gos-database-sql-package/
        // https://github.com/golang/go/wiki/SQLInterface
        for rows.Next() {
	        err = rows.Scan(&myuser.id, &myuser.first_name, &myuser.last_name, &myuser.company_name, &myuser.email, &myuser.tel)
                fmt.Println(myuser.id, myuser.first_name, myuser.last_name, myuser.company_name, myuser.email, myuser.tel)
	        if err != nil {
		        log.Fatal(err)
	        }
        }
        rerr := rows.Close()
        if rerr != nil {
                log.Fatal(err)
        }

        nome := "Max"
        cognome := "Third"
        azienda := "ThirdCompany"
        posta := "max.third@ingpec.eu"
        // https://www.tutorialspoint.com/postgresql/postgresql_where_clause.htm
        sqlStatement0 := `
            SELECT id FROM users 
            WHERE first_name = $1 AND last_name = $2 AND company_name = $3 AND email = $4;`
        id, err1 := db.Exec(sqlStatement0, nome, cognome, azienda, posta)
        if err1 != nil {
            panic(err1)
        }
        if id == nil {
                // https://www.calhoun.io/inserting-records-into-a-postgresql-database-with-gos-database-sql-package/
                sqlStatement1 := `
                    INSERT INTO users (first_name, last_name, company_name, email, tel)
                    VALUES($1, $2, $3, $4, $5)
                    RETURNING id`
                id := 0
                //err = db.QueryRow(sqlStatement,"Max", "Third", "ThirdCompany", "max.third@gmail.com", "3497187387").Scan(&id)
                err = db.QueryRow(sqlStatement1, nome, cognome, azienda, posta, "3497187387").Scan(&id)
                if err != nil {
                    panic(err)
                }
                fmt.Println("New record ID is: ", id)
        }
        // https://www.calhoun.io/updating-and-deleting-postgresql-records-using-gos-sql-package/
        
        //sqlStatement := `
        //    DELETE FROM users
        //    WHERE id = $1;`
        //_, err = db.Exec(sqlStatement, 4)
        //if err != nil {
        //    panic(err)
        //}

        // https://www.calhoun.io/updating-and-deleting-postgresql-records-using-gos-sql-package/
        sqlStatement2 := `
            UPDATE users
            SET email = $2, tel = $3
            WHERE id = $1;`
        _, err = db.Exec(sqlStatement2, 3, "max.third@ingpec.eu", "1234567891")
        if err != nil {
            panic(err)
        }


}
