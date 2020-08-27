package main

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
)

const (
	CONN_HOST = "127.0.0.1"
	CONN_PORT = "2000"
)

type Puser struct {
	id           string `json:"id"` // primary key
	first_name   string `json:"first_name"`
	last_name    string `json:"last_name"`
	company_name string `json:"company_name"`
	email        string `json:"email"`
	tel          string `json:"tel"`
}

type Pusers []Puser

var pusers []Puser

func BasicAuth(h httprouter.Handle, requiredUser, requiredPassword string) httprouter.Handle {
        return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
                // Get the Basic Authentication credentials
                user, password, hasAuth := r.BasicAuth()

                if hasAuth && user == requiredUser && password == requiredPassword {
                        // Delegate request to the given handle
                        h(w, r, ps)
                } else {
                        // Request Basic Authentication otherwise
                        w.Header().Set("WWW-Authenticate", "Basic realm=Restricted")
                        http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
                }
        }
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Not protected!\n")
}

func Protected(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprintf(w, "Protected!\n")
}

func hi_from_go_server(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from go-server")
}

type Route struct {
        Name        string
        Method      string
        Pattern     string
        HandlerFunc http.HandlerFunc
}

type Routes []Route;

var routes = Routes{
	Route{
		"getPusers",
		"GET",
		"/pusers",
		getPusers,
	},
	Route{
		"addPuser",
		"POST",
		"/puser/add",
		addPuser,
	},
}

func getPusers(w http.ResponseWriter, r *http.Request) {
        //fmt.Fprintf(w, "hello, %s!\n", ps.ByName("first_name"));
        json.NewEncoder(w).Encode(pusers);
        params := httprouter.ParamsFromContext(r.Context());
        fmt.Fprintf(w, "hello, %s!\n", params.ByName("name"));
}

func getPuser(w http.ResponseWriter, r *http.Request) {
}

func addPuser(w http.ResponseWriter, r *http.Request) {
	puser := Puser{}
	err := json.NewDecoder(r.Body).Decode(&puser)
	if err != nil {
		log.Print("error occured while decoding puser data :: ", err)
	}
	log.Printf("adding puser id :: % s with firstName ass :: %s and lastName as :: %s ", puser.id, puser.first_name, puser.last_name)
}

// https://github.com/julienschmidt/httprouter
//func AddRoutes(router

func main() {
        user := "marco"
        pass := "secret!"

	router := httprouter.New()
	router.GET("/", Index)
	router.GET("/protected/", BasicAuth(Protected, user, pass))

	http.HandleFunc("/", hi_from_go_server)
	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, nil)
	if err != nil {
		log.Fatal("error starting http server : ", err)
		return
	}

}
