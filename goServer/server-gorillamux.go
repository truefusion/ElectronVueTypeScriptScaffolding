package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

// /golangMatters/go-ebooks/GoWebDevelopmentCookbook/Chapter04/vuejs-client
// https://blog.questionable.services/article/vue-react-ember-server-golang/

const (
	CONN_HOST = "127.0.0.1"
	CONN_PORT = "2000"
)

type Puser struct {
	First_name   string `json:"First_name"`
	Last_name    string `json:"Last_name"`
	Country      string `json:"Country"`
	Company_name string `json:"Company_name"`
	Email        string `json:"Email"`
	Tel          string `json:"Tel"`
}

type Pusers []Puser

var pusers []Puser

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

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

//func init() {
//        pusers = Pusers{
//                Puser{first_name: "Pinco", last_name: "Pallo", company_name: "Company",
//                      email: "pinco.pallo@company.com", tel: "111111111"},
//        }
//}

func getPusers(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(pusers)
}

func addPuser(w http.ResponseWriter, r *http.Request) {
	puser := Puser{}
	err := json.NewDecoder(r.Body).Decode(&puser)
        //fmt.Println(r.Body)
	if err != nil {
		log.Print("error occured while decoding puser data :: ", err)
	}
	log.Printf("adding puser id :: % s with firstName as :: %s, lastName as :: %s, country as :: $s,companyName as :: %s, email as :: %s, tel as:: %s",
		puser.First_name, puser.Last_name,
		puser.Country, puser.Company_name, puser.Email, puser.Tel)
	pusers = append(pusers, Puser{First_name: puser.First_name,
		Last_name: puser.Last_name, Country: puser.Country, Company_name: puser.Company_name,
		Email: puser.Email, Tel: puser.Tel})
	fmt.Printf("%v\n", len(pusers))
	json.NewEncoder(w).Encode(pusers)
}

func AddRoutes(router *mux.Router) *mux.Router {
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}
	return router
}

func main() {
	muxRouter := mux.NewRouter().StrictSlash(true)
	router := AddRoutes(muxRouter)
	//router.PathPrefix("/").Handler(http.FileServer(http.Dir("../public/")))
	//router.PathPrefix("/").Handler(http.FileServer(http.Dir("../src/components/auth/")))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("../src/components/auth/Forms.vue")))

	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, router)
	if err != nil {
		log.Fatal("error starting http server :: ", err)
		return
	}
}
