// Package catalog is the agency's private rate card: services, options, prices and timelines.
//
// It is only ever shown to the admin. Quotations are drafted from it and then edited by hand.
package catalog

import (
	_ "embed"
	"encoding/json"
	"fmt"
	"math"
)

//go:embed catalog.json
var raw []byte

type Option struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Min      int      `json:"min"`
	Max      int      `json:"max"`
	Monthly  bool     `json:"monthly,omitempty"`
	Setup    int      `json:"setup,omitempty"`
	Weeks    string   `json:"weeks"`
	Includes []string `json:"includes"`
}

type Platform struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	Multiplier float64 `json:"multiplier"`
	ExtraWeeks string  `json:"extraWeeks"`
	StoreFee   string  `json:"storeFee"`
}

type Service struct {
	ID        string     `json:"id"`
	Name      string     `json:"name"`
	Icon      string     `json:"icon"`
	Blurb     string     `json:"blurb"`
	Options   []Option   `json:"options"`
	Platforms []Platform `json:"platforms,omitempty"`
}

type Package struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	For      string   `json:"for"`
	Price    int      `json:"price"`
	Monthly  int      `json:"monthly"`
	Weeks    string   `json:"weeks"`
	Featured bool     `json:"featured,omitempty"`
	Includes []string `json:"includes"`
}

type Maintenance struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Min      int      `json:"min"`
	Max      int      `json:"max"`
	Includes []string `json:"includes"`
}

type Catalog struct {
	Currency    string        `json:"currency"`
	Services    []Service     `json:"services"`
	Packages    []Package     `json:"packages"`
	Maintenance []Maintenance `json:"maintenance"`
	Terms       []string      `json:"terms"`
}

// Load parses the embedded rate card. It panics on a broken file, which the tests catch first.
func Load() *Catalog {
	var c Catalog
	if err := json.Unmarshal(raw, &c); err != nil {
		panic(fmt.Errorf("catalog.json: %w", err))
	}
	return &c
}

func (c *Catalog) Service(id string) *Service {
	for i := range c.Services {
		if c.Services[i].ID == id {
			return &c.Services[i]
		}
	}
	return nil
}

func (s *Service) Option(id string) *Option {
	for i := range s.Options {
		if s.Options[i].ID == id {
			return &s.Options[i]
		}
	}
	return nil
}

func (s *Service) Platform(id string) *Platform {
	for i := range s.Platforms {
		if s.Platforms[i].ID == id {
			return &s.Platforms[i]
		}
	}
	return nil
}

func (c *Catalog) Package(id string) *Package {
	for i := range c.Packages {
		if c.Packages[i].ID == id {
			return &c.Packages[i]
		}
	}
	return nil
}

// Pick is one thing a lead asked for, as sent by the website form.
type Pick struct {
	Service  string `json:"service"`
	Option   string `json:"option,omitempty"`
	Platform string `json:"platform,omitempty"`
}

// Line is one row of a quotation. Amount is in rupees; Monthly rows recur every month.
type Line struct {
	Title   string `json:"title"`
	Detail  string `json:"detail,omitempty"`
	Weeks   string `json:"weeks,omitempty"`
	Amount  int    `json:"amount"`
	Monthly bool   `json:"monthly,omitempty"`
}

// roundTo rounds to the nearest step, so drafted prices read like prices (₹42,000, not ₹41,860).
func roundTo(v float64, step int) int {
	return int(math.Round(v/float64(step))) * step
}

// Draft turns a lead's picks into quotation lines at the low end of each range.
// The admin adjusts the amounts before sending. Unknown picks are skipped.
func (c *Catalog) Draft(pkg string, picks []Pick) []Line {
	lines := []Line{}
	if p := c.Package(pkg); p != nil {
		lines = append(lines, Line{Title: p.Name + " package", Detail: joinList(p.Includes), Weeks: p.Weeks, Amount: p.Price})
		if p.Monthly > 0 {
			lines = append(lines, Line{Title: p.Name + " care plan", Detail: "Hosting, updates and support", Amount: p.Monthly, Monthly: true})
		}
		return lines
	}
	for _, pk := range picks {
		s := c.Service(pk.Service)
		if s == nil {
			continue
		}
		o := s.Option(pk.Option)
		if o == nil && len(s.Options) > 0 {
			o = &s.Options[0]
		}
		if o == nil {
			continue
		}
		title := s.Name + " — " + o.Name
		amount := float64(o.Min)
		weeks := o.Weeks
		detail := joinList(o.Includes)
		if pl := s.Platform(pk.Platform); pl != nil {
			title += " (" + pl.Name + ")"
			amount *= pl.Multiplier
			if pl.ExtraWeeks != "" {
				weeks += ", " + pl.ExtraWeeks
			}
			detail += ". Store fees: " + pl.StoreFee
		}
		if o.Setup > 0 {
			lines = append(lines, Line{Title: title + " setup", Detail: "Account, tracking and first campaigns", Weeks: weeks, Amount: o.Setup})
		}
		lines = append(lines, Line{Title: title, Detail: detail, Weeks: weeks, Amount: roundTo(amount, 1000), Monthly: o.Monthly})
	}
	return lines
}

func joinList(items []string) string {
	out := ""
	for i, s := range items {
		if i > 0 {
			out += ", "
		}
		out += s
	}
	return out
}

// Totals adds up one-time and monthly amounts, after a one-time discount.
func Totals(lines []Line, discount int) (once, monthly int) {
	for _, l := range lines {
		if l.Monthly {
			monthly += l.Amount
		} else {
			once += l.Amount
		}
	}
	once -= discount
	if once < 0 {
		once = 0
	}
	return once, monthly
}
